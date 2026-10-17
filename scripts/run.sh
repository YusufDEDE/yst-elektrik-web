#!/usr/bin/env bash
set -euo pipefail

WEB="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

IMAGE="${IMAGE:-yst-enerji-web}"
TAG="${TAG:-latest}"
PORT="${PORT:-3000}"
ENV_FILE="${ENV_FILE:-$WEB/.env.local}"
NAME="${NAME:-yst-enerji-web}"

RUN_ARGS=(
  --name "$NAME"
  -p "${PORT}:3000"
  --rm
)

if [[ -f "$ENV_FILE" ]]; then
  RUN_ARGS+=(--env-file "$ENV_FILE")
else
  echo "⚠ Env dosyası yok: $ENV_FILE (örnek: cp .env.example .env.local)" >&2
fi

echo "→ http://127.0.0.1:${PORT}  (${IMAGE}:${TAG})"
exec docker run "${RUN_ARGS[@]}" "${IMAGE}:${TAG}"
