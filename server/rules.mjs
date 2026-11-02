// What a comment asks for. Matching is on folded text (no diacritics) and whole words only,
// so "quen", "quê" or "đi cưới" never trigger anything by accident.
import { fold, hasPhrase } from './text.mjs';

// Order matters: the first intent that matches wins.
const INTENTS = [
  ['fortune', ['xin xam', 'gieo que', 'rut que', 'xin que', 'boc que', 'rut the', 'xin the', 'rut xam']],
  ['bell',    ['thinh chuong', 'gong chuong', 'danh chuong', 'chuong']],
  ['mo',      ['go mo', 'mo mo', 'tung kinh']],
  ['incense', ['thap huong', 'dang huong', 'thap nhang', 'dang nhang', 'nhang']],
  ['bow',     ['lay phat', 'bai phat', 'le phat', 'dinh le']],
];

// Prayers: the comment starts with one of these and carries a wish worth showing (after moderation).
const PRAYER_START = ['cau ', 'con cau ', 'nguyen ', 'con nguyen ', 'xin cho ', 'cau cho ', '!cau '];

// Outfit words: only when the whole comment IS the word (≤ 3 words), so "Nam mô A Di Đà Phật" never reads as "nam".
const SKINS = [
  ['master', ['cao tang']],
  ['monk',   ['su', 'su thay', 'thay', 'tang']],
  ['nun',    ['ni', 'ni co', 'su co']],
  ['child',  ['tieu', 'chu tieu', 'be']],
  ['granny', ['ba', 'ao nau', 'cu']],
  ['woman',  ['nu', 'chi', 'gai']],
  ['man',    ['nam', 'anh', 'trai']],
];

export function skinFromText(text) {
  const f = fold(text);
  if (!f || f.split(' ').length > 3) return null;
  for (const [skin, words] of SKINS) if (words.includes(f)) return skin;
  return null;
}

/**
 * @returns {{ intent: 'fortune'|'bell'|'mo'|'incense'|'bow'|'prayer'|'skin'|'chat', skin?: string, wish?: string }}
 */
export function parseComment(raw) {
  const text = String(raw ?? '');
  const skin = skinFromText(text);
  if (skin) return { intent: 'skin', skin };
  const f = fold(text);
  if (!f) return { intent: 'chat' };
  const lower = text.toLowerCase().trim();
  for (const p of PRAYER_START) {
    if ((f + ' ').startsWith(fold(p) + ' ') || lower.startsWith(p.trim() + ' ')) {
      const wish = text.trim().replace(/^!?\s*/, '');
      if (wish.length >= 8) return { intent: 'prayer', wish };
    }
  }
  // short commands only: a long sentence that happens to contain "chuông" is just a comment
  const words = f.split(' ').length;
  for (const [intent, phrases] of INTENTS) {
    for (const p of phrases) {
      const single = !p.includes(' ');
      if (single && words > 3) continue;           // one-word triggers must be (almost) the whole comment
      if (hasPhrase(f, p)) return { intent };
    }
  }
  return { intent: 'chat' };
}

export const SKIN_NAMES = ['man', 'woman', 'granny', 'monk', 'nun', 'child', 'master'];
