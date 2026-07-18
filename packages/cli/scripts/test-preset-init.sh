#!/usr/bin/env bash
# Smoke-test the preset init flow end-to-end against the local /init route.
#
# What it does:
#   1. Copies test/fixtures/frameworks/vite to a temp dir (preserving the
#      original fixture).
#   2. Runs the built CLI in that temp dir with the given preset code,
#      pointed at a locally running apps/v4 dev server.
#   3. Prints components.json and the init-touched part of the CSS file
#      so you can eyeball the preset landing.
#
# Prerequisites:
#   - Start the web dev server first in a separate terminal:
#       cd apps/v4 && pnpm dev
#     Wait for "Local: http://localhost:3000/".
#   - Build the CLI before running this script:
#       cd packages/cli && pnpm build
#
# Usage:
#   packages/cli/scripts/test-preset-init.sh [preset-code]
#   packages/cli/scripts/test-preset-init.sh            # defaults to 'nova'
#   packages/cli/scripts/test-preset-init.sh a33ViDwO   # encoded custom preset

set -euo pipefail

PRESET="${1:-nova}"
CLI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$CLI_DIR/../.." && pwd)"
FIXTURE="$CLI_DIR/test/fixtures/frameworks/vite"
CLI_BIN="$CLI_DIR/dist/index.js"

if [[ ! -f "$CLI_BIN" ]]; then
  echo "error: CLI not built. Run 'pnpm build' in packages/cli first." >&2
  exit 1
fi

if ! curl -fsS -o /dev/null "http://localhost:3000/init?preset=$PRESET&track=0"; then
  echo "error: http://localhost:3000/init is not reachable." >&2
  echo "       Start the web dev server: (cd apps/v4 && pnpm dev)" >&2
  exit 1
fi

WORK_DIR="$(mktemp -d -t shadcn-vue-preset-XXXXXX)"
trap 'rm -rf "$WORK_DIR"' EXIT

echo "→ Copying fixture to $WORK_DIR"
cp -R "$FIXTURE/." "$WORK_DIR/"

# nypm picks a package manager from the presence of a lockfile. The fixture
# ships none; create an empty package-lock.json so the "install dependencies"
# step completes (no network install — npm will just resolve from package.json).
: > "$WORK_DIR/package-lock.json"

# The fixture keeps `paths` in tsconfig.app.json; copy them to tsconfig.json
# root so the CLI's import-alias preflight (which reads the root tsconfig)
# can find "@/*".
node -e "
const fs = require('fs');
const p = '$WORK_DIR/tsconfig.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));
c.compilerOptions = { baseUrl: '.', paths: { '@/*': ['./src/*'] } };
fs.writeFileSync(p, JSON.stringify(c, null, 2));
"

echo "→ Running: node dist/index.js init --preset $PRESET --template vite --yes"
INIT_STATUS=0
(
  cd "$WORK_DIR" && \
  SHADCN_VUE_URL=http://localhost:3000 \
  REGISTRY_URL=http://localhost:3000/r \
  node "$CLI_BIN" init --preset "$PRESET" --template vite --yes
) || INIT_STATUS=$?

echo
echo "──────── components.json ────────"
cat "$WORK_DIR/components.json" 2>/dev/null || echo "(not written)"

CSS_FILE="$WORK_DIR/src/index.css"
if [[ -f "$CSS_FILE" ]]; then
  echo
  echo "──────── $CSS_FILE (first 40 lines) ────────"
  head -40 "$CSS_FILE"
fi

UTILS="$WORK_DIR/src/lib/utils.ts"
if [[ -f "$UTILS" ]]; then
  echo
  echo "──────── src/lib/utils.ts ────────"
  cat "$UTILS"
fi

echo
if [[ "$INIT_STATUS" -ne 0 ]]; then
  echo "✖ Preset init failed (exit $INIT_STATUS). Artifacts above are partial."
  echo "  Temp dir: $WORK_DIR (cleaned on exit)."
  exit "$INIT_STATUS"
fi
echo "✔ Preset init completed. Temp dir: $WORK_DIR (cleaned on exit)."
echo "  Re-run with a different preset code: $0 <code>"
