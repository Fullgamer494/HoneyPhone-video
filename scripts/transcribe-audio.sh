#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  printf 'Uso: %s archivo.mp3 [directorio-de-salida]\n' "$0" >&2
  exit 2
fi

input=$1
output_dir=${2:-captions}
project_root=$(cd "$(dirname "$0")/.." && pwd)
whisper="$project_root/tools/whisper.cpp/build/bin/whisper-cli"
model="$project_root/tools/whisper.cpp/models/ggml-base.bin"

if [[ ! -f "$input" ]]; then
  printf 'No existe el archivo de entrada: %s\n' "$input" >&2
  exit 2
fi
if [[ ! -x "$whisper" || ! -f "$model" ]]; then
  printf 'Whisper.cpp o el modelo base no está instalado en este directorio.\n' >&2
  exit 2
fi

mkdir -p "$output_dir"
audio_tmp=$(mktemp --suffix=.wav)
trap 'rm -f "$audio_tmp"' EXIT
ffmpeg -hide_banner -loglevel error -y -i "$input" -ar 16000 -ac 1 -c:a pcm_s16le "$audio_tmp"
name=$(basename "${input%.*}")
"$whisper" -m "$model" -f "$audio_tmp" -l es -osrt -ovtt -of "$output_dir/$name"
if [[ "$name" == "narracion-completa" && "$output_dir" == "captions" ]]; then
  "$project_root/scripts/fix-whisper-subtitles.py"
fi
printf 'Subtítulos listos: %s/%s.srt y .vtt\n' "$output_dir" "$name"
