#!/usr/bin/env bash
# Run ON THE VPS with sudo access:  bash install-caddy.sh
# Installs the site entry, validates the WHOLE Caddy config first, and only then reloads.
# If validation fails, nothing is reloaded and the other sites are untouched.
set -euo pipefail
SRC="${1:-/home/biasharaos/ladyjeybee/deploy/ladyjeybee.caddy}"
DEST=/etc/caddy/sites.d/ladyjeybee.caddy

sudo cp "$SRC" "$DEST"
if sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  sudo systemctl reload caddy
  echo "Caddy reloaded. Test: curl -I https://ladyjeybee.biasharaos.com"
else
  echo "Caddy config is INVALID with the new site — removing it, nothing reloaded." >&2
  sudo rm -f "$DEST"
  sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1 | tail -15 >&2
  exit 1
fi
