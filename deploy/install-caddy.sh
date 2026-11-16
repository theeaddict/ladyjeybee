#!/usr/bin/env bash
# Run ON THE VPS (needs sudo):   bash install-caddy.sh site       # step 1: serve ladyjeybeeaurelia.co.ke
#                                bash install-caddy.sh redirect   # step 2: old subdomain -> new domain
# Every change is validated against the WHOLE Caddy config before reloading. If validation fails the
# previous files are restored and nothing is reloaded, so the other sites on this server are untouched.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)/caddy"
DEST=/etc/caddy/sites.d
MODE="${1:-}"

case "$MODE" in
  site)     SRC="$DIR/ladyjeybeeaurelia.co.ke.caddy";                  NAME="ladyjeybeeaurelia.co.ke.caddy" ;;
  redirect) SRC="$DIR/ladyjeybee.biasharaos.com.redirect.caddy";       NAME="ladyjeybee.caddy" ;;
  *) echo "Usage: bash install-caddy.sh site|redirect" >&2; exit 2 ;;
esac

BACKUP="$(mktemp)"; HAD=0
if sudo test -f "$DEST/$NAME"; then sudo cp "$DEST/$NAME" "$BACKUP"; HAD=1; fi
sudo cp "$SRC" "$DEST/$NAME"

if sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  sudo systemctl reload caddy
  echo "Caddy reloaded with $NAME."
else
  echo "Caddy config is INVALID with $NAME - restoring the previous state, nothing reloaded." >&2
  if [ "$HAD" = 1 ]; then sudo cp "$BACKUP" "$DEST/$NAME"; else sudo rm -f "$DEST/$NAME"; fi
  sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1 | tail -15 >&2
  exit 1
fi
