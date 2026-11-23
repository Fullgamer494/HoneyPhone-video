#!/usr/bin/env python3
"""Correct known product and networking terms in Whisper's local captions."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAPTIONS = ROOT / "captions"
REPLACEMENTS = [
    ("Ona iPhone en las guarda", "HoneyPhone las guarda"),
    ("Ona iPhone", "HoneyPhone"),
    ("ona iPhone", "HoneyPhone"),
    ("Una iPhone Reune Observación", "HoneyPhone reúne observación"),
    ("Una iPhone Reune", "HoneyPhone reúne"),
    ("Una iPhone observa", "HoneyPhone observa"),
    ("Una iPhone", "HoneyPhone"),
    ("Asimulaciones", "Las simulaciones"),
    ("DM", "dBm"),
    ("GT", "GET"),
    ("EAD", "HEAD"),
    ("PACH", "PATCH"),
    ("a la PI", "a la API"),
    ("la PI", "la API"),
    ("En actividad", "En Actividad"),
    ("desde actividad", "desde Actividad"),
    ("inalámbrica, por sí sola", "inalámbrica; por sí sola"),
    ("Cada resultado aporta una pieza distinta.", "Cada resultado aporta una pieza distinta:"),
    ("Como se presenta", "cómo se presenta"),
    ("teléfono, desde aquí", "teléfono; desde aquí"),
    ("un señal", "una señal"),
    ("por si sola", "por sí sola"),
    ("se resuelve en nombres", "se resuelven nombres"),
    ("contra señas", "contraseñas"),
    ("que lecturas", "qué lecturas"),
    ("que ocurrió", "qué ocurrió"),
    ("vista de cuentas", "vista de cuenta"),
    ("que dispositivo", "qué dispositivo"),
    ("que llegó", "qué llegó"),
    ("que datos", "qué datos"),
    ("wifi", "Wi-Fi"),
]

for path in (CAPTIONS / "narracion-completa.srt", CAPTIONS / "narracion-completa.vtt"):
    if not path.exists():
        continue
    text = path.read_text(encoding="utf-8")
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    text = "\n".join(line.lstrip() for line in text.splitlines())
    path.write_text(text.rstrip() + "\n", encoding="utf-8")
    print(f"Corregidos términos en {path.name}")
