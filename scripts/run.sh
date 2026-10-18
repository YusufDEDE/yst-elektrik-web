#!/usr/bin/env bash
set -euo pipefail

WEB="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

IMAGE="${IMAGE:-yst-enerji-web}"
TAG="${TAG:-latest}"
PORT="${PORT:-3000}"
ENV_FILE="${ENV_FILE:-$WEB/.env.local}"
NAME="${NAME:-yst-enerji-web}"
AUTO_PORT="${AUTO_PORT:-1}"
DETACH="${DETACH:-0}"

if ! docker image inspect "${IMAGE}:${TAG}" >/dev/null 2>&1; then
  echo "✗ İmaj yok: ${IMAGE}:${TAG} — önce: ./scripts/build.sh" >&2
  exit 1
fi

if [[ "$AUTO_PORT" == "1" ]] && command -v lsof >/dev/null 2>&1; then
  while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
    echo "⚠ Port $PORT dolu, $((PORT + 1)) deneniyor…" >&2
    PORT=$((PORT + 1))
  done
fi

docker rm -f "$NAME" >/dev/null 2>&1 || true

RUN_ARGS=(
  --name "$NAME"
  -p "${PORT}:3000"
)

if [[ "$DETACH" == "1" ]]; then
  RUN_ARGS+=(-d)
else
  RUN_ARGS+=(--rm)
fi

if [[ -f "$ENV_FILE" ]]; then
  RUN_ARGS+=(--env-file "$ENV_FILE")
else
  echo "⚠ Env dosyası yok: $ENV_FILE (örnek: cp .env.example .env.local)" >&2
fi

echo "→ http://127.0.0.1:${PORT}  (${IMAGE}:${TAG})"

if [[ "$DETACH" == "1" ]]; then
  docker run "${RUN_ARGS[@]}" "${IMAGE}:${TAG}"
  echo "✓ Konteyner arka planda: docker logs -f $NAME"
else
  exec docker run "${RUN_ARGS[@]}" "${IMAGE}:${TAG}"
fi
