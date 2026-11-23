#!/usr/bin/env python3
"""Generate one WAV and MP3 per narration segment with local Kokoro ONNX."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro


ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "voice/models/kokoro-v1.0.int8.onnx"
VOICES = ROOT / "voice/models/voices-v1.0.bin"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--voice", default="ef_dora", help="Kokoro voice ID (default: ef_dora)")
    parser.add_argument("--lang", default="es", help="phonemizer language (default: es)")
    parser.add_argument("--speed", type=float, default=1.0, help="speech rate between 0.5 and 2.0")
    parser.add_argument("--input-dir", type=Path, default=ROOT / "voice/segments")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "voice/audio")
    args = parser.parse_args()

    if not MODEL.is_file() or not VOICES.is_file():
        print(f"Modelo/paquete de voces no encontrado en {MODEL.parent}", file=sys.stderr)
        return 2

    segments = sorted(args.input_dir.glob("*.txt"))
    if not segments:
        print(f"No hay segmentos .txt en {args.input_dir}", file=sys.stderr)
        return 2

    args.output_dir.mkdir(parents=True, exist_ok=True)
    tts = Kokoro(str(MODEL), str(VOICES))
    for text_path in segments:
        text = text_path.read_text(encoding="utf-8").strip()
        if not text:
            continue
        audio, sample_rate = tts.create(
            text,
            voice=args.voice,
            speed=args.speed,
            lang=args.lang,
            sentence_pause=0.28,
            clause_pause=0.12,
        )
        wav_path = args.output_dir / f"{text_path.stem}.wav"
        mp3_path = args.output_dir / f"{text_path.stem}.mp3"
        sf.write(wav_path, audio, sample_rate, subtype="PCM_16")
        subprocess.run(
            [
                "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-i",
                str(wav_path),
                "-codec:a",
                "libmp3lame",
                "-b:a",
                "192k",
                str(mp3_path),
            ],
            check=True,
        )
        print(f"Creado: {wav_path.name} + {mp3_path.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
