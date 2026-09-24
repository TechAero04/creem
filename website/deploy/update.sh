#!/usr/bin/env bash
# Pull the latest code and restart the site.  Run as root:  bash update.sh
set -euo pipefail
APP_DIR=/var/www/deepshikha
BRANCH=deepshikha-main

git -C "$APP_DIR" fetch origin "$BRANCH"
git -C "$APP_DIR" reset --hard "origin/$BRANCH"
cd "$APP_DIR/website"
npm ci --no-audit --no-fund
npm run build
pm2 restart deepshikha-website
echo "Updated. Live in a few seconds."
