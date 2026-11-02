// Vietnamese voice lines with Microsoft Edge "Read Aloud" voices (msedge-tts, needs Internet).
// One line at a time, a priority queue (gifts / fortunes / milestones first), a hash cache for lines that repeat
// (chants, prompts) and a fallback: when Edge TTS fails the overlay is told to speak the text with the browser voice.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { xmlEscape } from './text.mjs';

export class Voice {
  /**
   * @param {{ dir:string, urlPrefix:string, send:(msg:object)=>void, log:(s:string)=>void, settings:()=>object, disabled?:boolean }} o
   */
  constructor(o) {
    Object.assign(this, o);
    this.queue = []; this.busy = false; this.seq = 0; this.fails = 0;
    fs.mkdirSync(this.dir, { recursive: true });
    this.prune(0);
  }

  /** Queue a line. prio: 2 = gift / fortune / milestone / operator, 1 = everything else. Returns a key the overlay echoes. */
  say(text, { prio = 1, tag = '' } = {}) {
    text = String(text).replace(/\s+/g, ' ').trim().slice(0, 600);
    if (!text) return null;
    const key = `v${++this.seq}`;
    // keep the queue short: drop the oldest low-priority line first; never let it grow past 15
    if (this.queue.length >= 15) {
      const i = this.queue.findIndex(q => q.prio < 2);
      if (i < 0 && prio < 2) { this.log('Hàng đợi giọng đọc đầy, bỏ qua 1 câu'); return null; }
      this.queue.splice(i < 0 ? 0 : i, 1);
    }
    const item = { key, text, prio, tag, at: Date.now() };
    const pos = this.queue.findIndex(q => q.prio < prio);
    pos < 0 ? this.queue.push(item) : this.queue.splice(pos, 0, item);
    this.pump();
    return key;
  }

  async pump() {
    if (this.busy || !this.queue.length) return;
    this.busy = true;
    const item = this.queue.shift();
    try {
      // low-priority lines that waited too long are no longer relevant
      if (item.prio < 2 && Date.now() - item.at > 60_000) throw Object.assign(new Error('stale'), { stale: true });
      if (this.disabled) throw new Error('TTS tắt (DISABLE_TTS)');
      const url = await this.render(item.text);
      this.fails = 0;
      this.send({ t: 'tts', key: item.key, url, text: item.text, tag: item.tag });
    } catch (e) {
      if (!e.stale) {
        this.fails++;
        if (this.fails <= 3 || this.fails % 20 === 0) this.log('Giọng Edge lỗi, dùng giọng trình duyệt: ' + (e?.message || e));
        this.send({ t: 'speak', key: item.key, text: item.text, tag: item.tag });
      }
    }
    this.busy = false;
    setTimeout(() => this.pump(), 30);
  }

  async render(text) {
    const s = this.settings();
    const pitch = `${s.pitch >= 0 ? '+' : ''}${s.pitch}Hz`, rate = `${s.rate >= 0 ? '+' : ''}${s.rate}%`;
    const hash = crypto.createHash('sha1').update(`${s.voice}|${pitch}|${rate}|${text}`).digest('hex').slice(0, 20);
    const file = path.join(this.dir, `${hash}.mp3`);
    if (fs.existsSync(file) && fs.statSync(file).size > 0) { fs.utimesSync(file, new Date(), new Date()); return `${this.urlPrefix}${hash}.mp3`; }
    // One warm connection is fast (~0.4 s a line). The service sometimes drops a socket or stalls, so on any
    // error the connection is thrown away and the line retried on a new one after a short pause.
    let err;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const buf = await this.synth(text, s.voice, pitch, rate);
        fs.writeFileSync(file + '.tmp', buf); fs.renameSync(file + '.tmp', file);
        this.prune(300);
        return `${this.urlPrefix}${hash}.mp3`;
      } catch (e) {
        err = e; this.resetClient();
        if (attempt < 3) await new Promise(r => setTimeout(r, 800 * attempt));
      }
    }
    throw err;
  }

  async client(voice) {
    if (this.tts && this.ttsVoice === voice) return this.tts;
    this.resetClient();
    const { MsEdgeTTS, OUTPUT_FORMAT } = await import('msedge-tts');
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    this.tts = tts; this.ttsVoice = voice;
    return tts;
  }

  resetClient() { try { this.tts?.close(); } catch {} this.tts = null; }

  async synth(text, voice, pitch, rate) {
    const tts = await this.client(voice);
    let timer;
    try {
      const { audioStream } = tts.toStream(xmlEscape(text), { pitch, rate });
      const chunks = [];
      await Promise.race([
        new Promise((res, rej) => { audioStream.on('data', c => chunks.push(c)); audioStream.on('close', res); audioStream.on('error', rej); }),
        new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('quá 25 giây')), 25_000); }),
      ]);
      const buf = Buffer.concat(chunks);
      if (buf.length < 1000) throw new Error('âm thanh rỗng');
      return buf;
    } finally { clearTimeout(timer); }
  }

  /** keep the cache folder small: newest `keep` files stay */
  prune(keep) {
    try {
      const files = fs.readdirSync(this.dir).map(f => ({ f, t: fs.statSync(path.join(this.dir, f)).mtimeMs })).sort((a, b) => b.t - a.t);
      for (const { f } of files.slice(keep)) if (keep > 0 || f.endsWith('.tmp')) fs.unlinkSync(path.join(this.dir, f));
    } catch {}
  }
}
