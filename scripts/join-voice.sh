#!/usr/bin/env bash
set -euo pipefail
script_dir=$(cd "$(dirname "$0")" && pwd)
exec "$script_dir/../voice/.venv/bin/python" "$script_dir/join-voice.py" "$@"
