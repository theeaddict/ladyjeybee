#!/usr/bin/env bash
# Deploys the website to the VPS: sync code -> build image -> (re)start container.
# Usage:  deploy/deploy.sh                      # temporary subdomain (not indexed by Google)
#         SITE_URL=https://clientdomain.co.ke NOINDEX= deploy/deploy.sh   # final domain
#
# The Caddy entry (needs sudo on the server) is installed separately: see deploy/README.md
set -euo pipefail

HOST="${DEPLOY_HOST:-13.140.182.206}"          # SSH settings come from ~/.ssh/config (port 2222)
REMOTE_DIR="${REMOTE_DIR:-/home/biasharaos/ladyjeybee}"
SITE_URL="${SITE_URL:-https://ladyjeybee.biasharaos.com}"
NOINDEX="${NOINDEX-true}"                       # "true" while on a temporary domain; empty on the real one
PORT="${APP_HOST_PORT:-3100}"

cd "$(dirname "$0")/.."

echo "==> Syncing code to $HOST:$REMOTE_DIR"
ssh "$HOST" "mkdir -p '$REMOTE_DIR'"
rsync -az --delete \
  --exclude node_modules --exclude .next --exclude .git --exclude .claude \
  --exclude '.env*' --exclude '*.log' --exclude tsconfig.tsbuildinfo \
  -e ssh ./ "$HOST:$REMOTE_DIR/"

echo "==> Writing server .env (SITE_URL=$SITE_URL, NOINDEX=${NOINDEX:-off})"
ssh "$HOST" "umask 077 && cat > '$REMOTE_DIR/.env' <<ENV
NEXT_PUBLIC_SITE_URL=$SITE_URL
NEXT_PUBLIC_NOINDEX=$NOINDEX
APP_HOST_PORT=$PORT
ENV"
# Optional pixel / verification codes: keep them in the server's .env.extra (never in git) and they are appended.
ssh "$HOST" "[ -f '$REMOTE_DIR/.env.extra' ] && cat '$REMOTE_DIR/.env.extra' >> '$REMOTE_DIR/.env' || true"

echo "==> Building and starting the container (low priority so other sites are not slowed)"
ssh "$HOST" "cd '$REMOTE_DIR' && nice -n 15 docker compose build && docker compose up -d && docker image prune -f >/dev/null"

echo "==> Waiting for the app to answer on 127.0.0.1:$PORT"
for i in $(seq 1 30); do
  code=$(ssh "$HOST" "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$PORT/" || true)
  [ "$code" = "200" ] && { echo "OK: app is up (HTTP 200)"; exit 0; }
  sleep 2
done
echo "App did not become healthy. Logs:" >&2
ssh "$HOST" "cd '$REMOTE_DIR' && docker compose logs --tail=40" >&2
exit 1
