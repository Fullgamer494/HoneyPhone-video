#!/usr/bin/env python3
"""Join scene WAVs with a short pause for a complete narration reference."""

from __future__ import annotations

import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "voice/audio"
SEGMENTS = ROOT / "voice/segments"
segment_paths = [AUDIO / f"{p.stem}.wav" for p in sorted(SEGMENTS.glob("*.txt"))]
if not segment_paths or any(not p.is_file() for p in segment_paths):
    raise SystemExit("Genera primero los segmentos WAV con scripts/generate-voice.sh")

parts = []
sample_rate = None
for index, path in enumerate(segment_paths):
    samples, current_rate = sf.read(path, dtype="float32")
    if sample_rate is None:
        sample_rate = current_rate
    elif current_rate != sample_rate:
        raise SystemExit("Las tasas de muestreo de los WAV no coinciden")
    parts.append(samples)
    if index < len(segment_paths) - 1:
        parts.append(np.zeros(int(sample_rate * 0.45), dtype=np.float32))

complete = np.concatenate(parts)
wav_path = AUDIO / "narracion-completa.wav"
mp3_path = AUDIO / "narracion-completa.mp3"
sf.write(wav_path, complete, sample_rate, subtype="PCM_16")
subprocess.run(
    ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-b:a", "192k", str(mp3_path)],
    check=True,
)
print(f"Creada narracion-completa.mp3 ({len(complete) / sample_rate:.1f} s)")
