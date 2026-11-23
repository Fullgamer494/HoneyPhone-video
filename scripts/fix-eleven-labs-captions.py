#!/usr/bin/env python3
"""Correct Whisper's Spanish transcription of the approved ElevenLabs voice."""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CAPTIONS = ROOT / "captions" / "eleven-labs"

REPLACEMENTS = {
    "OniPhone": "HoneyPhone",
    "Honey Phone": "HoneyPhone",
    "Honifón": "HoneyPhone",
    "Honifone": "HoneyPhone",
    "un etiqueta opcional": "una etiqueta opcional",
    "de la enlace con el router": "del enlace con el router",
    "desivelios respecto a un nilibatio": "decibelios respecto a un milivatio",
    "mayores la señal recibida": "mayor es la señal recibida",
    "aporta con texto": "aporta contexto",
    "una reza": "una red",
    "si revisar": "y revisar",
    "pestaña actividad reuna": "pestaña Actividad reúne",
    '"get"': "GET",
    '"head"': "HEAD",
    '"post"': "POST",
    '"put"': "PUT",
    '"patch"': "PATCH",
    '"delete"': "DELETE",
    '"options"': "OPTIONS",
    '"http"': "HTTP",
    "cuando IWi-Fi e Internet": "cuando hay Wi-Fi e Internet",
}


def correct_text(value: str) -> str:
    value = value.strip()
    for old, new in REPLACEMENTS.items():
        value = value.replace(old, new)
    return re.sub(r"\s+", " ", value)


def parse_time(value: str) -> int:
    hours, minutes, seconds = value.split(":")
    seconds, millis = seconds.split(",")
    return ((int(hours) * 60 + int(minutes)) * 60 + int(seconds)) * 1000 + int(millis)


def main() -> None:
    scene_captions: list[list[dict[str, object]]] = []
    for srt_path in sorted(CAPTIONS.glob("*.srt")):
        blocks = re.split(r"\n\s*\n", srt_path.read_text(encoding="utf-8").strip())
        normalized_blocks = []
        entries = []
        for block in blocks:
            lines = block.splitlines()
            if len(lines) < 3 or "-->" not in lines[1]:
                continue
            start, end = (part.strip() for part in lines[1].split("-->"))
            text = correct_text(" ".join(lines[2:]))
            normalized_blocks.append(f"{lines[0]}\n{start} --> {end}\n{text}")
            start_ms, end_ms = parse_time(start), parse_time(end)
            entries.append(
                {
                    "text": text,
                    "startMs": start_ms,
                    "endMs": end_ms,
                    "timestampMs": (start_ms + end_ms) // 2,
                    "confidence": None,
                }
            )
        srt_path.write_text("\n\n".join(normalized_blocks) + "\n", encoding="utf-8")

        vtt_path = srt_path.with_suffix(".vtt")
        vtt_blocks = ["WEBVTT"]
        for entry in entries:
            start = int(entry["startMs"])
            end = int(entry["endMs"])
            fmt = lambda ms: f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02}.{ms % 1000:03}"
            vtt_blocks.append(f"{fmt(start)} --> {fmt(end)}\n{entry['text']}")
        vtt_path.write_text("\n\n".join(vtt_blocks) + "\n", encoding="utf-8")
        scene_captions.append(entries)

    output = [
        "import type { Caption } from \"@remotion/captions\";",
        "",
        "// Regenerated from the ten ElevenLabs segments; each scene uses local MP3 time.",
        "export const sceneCaptions: readonly (readonly Caption[])[] = [",
    ]
    for entries in scene_captions:
        output.append("  [")
        for item in entries:
            text = str(item["text"]).replace("\\", "\\\\").replace('"', '\\"')
            output.append(
                f'    {{ text: "{text}", startMs: {item["startMs"]}, endMs: {item["endMs"]}, '
                f'timestampMs: {item["timestampMs"]}, confidence: null }},'
            )
        output.append("  ],")
    output.append("] as const;")
    (ROOT / "src" / "captions.ts").write_text("\n".join(output) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
