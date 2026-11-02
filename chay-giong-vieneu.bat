@echo off
chcp 65001 >nul
cd /d "%~dp0tools\VieNeu-TTS"
title Giong doc VieNeu-TTS - giu cua so nay mo
if not exist ".venv\Scripts\python.exe" (echo Chua cai VieNeu. Chay cai-giong-vieneu.bat truoc. & pause & exit /b 1)
rem Chi nghe trong may nay. Watermark am cua VieNeu giu nguyen.
set HOST=127.0.0.1
set PORT=8000
set PYTHONUTF8=1
.venv\Scripts\python.exe -m apps.openai_speech
pause
