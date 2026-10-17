#!/usr/bin/env bash
set -euo pipefail

WEB="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

IMAGE="${IMAGE:-yst-enerji-web}"
TAG="${TAG:-latest}"
ENV_FILE="${ENV_FILE:-$WEB/.env.local}"

BUILD_ARGS=()
if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
  if [[ -n "${NEXT_PUBLIC_MAPBOX_TOKEN:-}" ]]; then
    BUILD_ARGS+=(--build-arg "NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}")
  fi
  if [[ -n "${NEXT_PUBLIC_OPENAI_API_KEY:-}" ]]; then
    BUILD_ARGS+=(--build-arg "NEXT_PUBLIC_OPENAI_API_KEY=${NEXT_PUBLIC_OPENAI_API_KEY}")
  fi
fi

echo "→ docker build -t ${IMAGE}:${TAG} (${WEB})"
if ((${#BUILD_ARGS[@]} > 0)); then
  docker build "${BUILD_ARGS[@]}" -t "${IMAGE}:${TAG}" -f "$WEB/Dockerfile" "$WEB"
else
  docker build -t "${IMAGE}:${TAG}" -f "$WEB/Dockerfile" "$WEB"
fi
echo "✓ ${IMAGE}:${TAG}"
