#!/usr/bin/env bash
# Run ON THE VPS (needs sudo):
#   bash install-caddy.sh site     # serve ladyjeybeeaurelia.co.ke
#   bash install-caddy.sh remove   # take the old temporary subdomain (ladyjeybee.biasharaos.com) off the server
# Every change is validated against the WHOLE Caddy config before reloading. If validation fails the
# previous files are restored and nothing is reloaded, so the other sites on this server are untouched.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)/caddy"
DEST=/etc/caddy/sites.d
MODE="${1:-}"

case "$MODE" in
  site)   NAME="ladyjeybeeaurelia.co.ke.caddy"; SRC="$DIR/$NAME" ;;
  remove) NAME="ladyjeybee.caddy";              SRC="" ;;
  *) echo "Usage: bash install-caddy.sh site|remove" >&2; exit 2 ;;
esac

BACKUP="$(mktemp)"; HAD=0
if sudo test -f "$DEST/$NAME"; then sudo cp "$DEST/$NAME" "$BACKUP"; HAD=1; fi

if [ "$MODE" = remove ]; then
  if [ "$HAD" = 0 ]; then echo "Nothing to remove: $DEST/$NAME does not exist."; exit 0; fi
  sudo rm -f "$DEST/$NAME"
else
  sudo cp "$SRC" "$DEST/$NAME"
fi

if sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  sudo systemctl reload caddy
  echo "Caddy reloaded ($MODE $NAME)."
else
  echo "Caddy config is INVALID after '$MODE' - restoring the previous state, nothing reloaded." >&2
  if [ "$HAD" = 1 ]; then sudo cp "$BACKUP" "$DEST/$NAME"; else sudo rm -f "$DEST/$NAME"; fi
  sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1 | tail -15 >&2
  exit 1
fi
