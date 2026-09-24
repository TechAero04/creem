#!/usr/bin/env bash
# First-time setup for the Deepshikha AI website on a fresh Ubuntu VPS (Hostinger or any other).
# Run as root:  bash setup-server.sh yourdomain.com
set -euo pipefail

DOMAIN="${1:-}"
if [ -z "$DOMAIN" ]; then echo "Usage: bash setup-server.sh yourdomain.com"; exit 1; fi

APP_DIR=/var/www/deepshikha
REPO=https://github.com/TechAero04/creem.git
BRANCH=deepshikha-main
PORT=3100

echo "==> Installing Node.js 22, git, nginx and certbot"
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
npm install -g pm2

echo "==> Getting the code"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch origin "$BRANCH" && git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  git clone --depth 1 --branch "$BRANCH" "$REPO" "$APP_DIR"
fi

echo "==> Building the website"
cd "$APP_DIR/website"
[ -f .env.production ] || cat > .env.production <<'ENVFILE'
# Fill these in, then run: pm2 restart deepshikha-website
ADMIN_PASSWORD=change-this-to-something-long
NEXT_PUBLIC_SALES_EMAIL=sales@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_LEGAL_ADDRESS=
NEXT_PUBLIC_GRIEVANCE_OFFICER=
NEXT_PUBLIC_JURISDICTION_CITY=
ENVFILE
npm ci --no-audit --no-fund
npm run build

echo "==> Starting the site with pm2 (restarts on reboot)"
pm2 delete deepshikha-website 2>/dev/null || true
pm2 start npm --name deepshikha-website --cwd "$APP_DIR/website" -- run start
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

echo "==> Pointing $DOMAIN at the site"
cat > /etc/nginx/sites-available/deepshikha <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/deepshikha /etc/nginx/sites-enabled/deepshikha
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Requesting the free HTTPS certificate"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --register-unsafely-without-email --redirect || \
  echo "!! Certificate failed. This usually means DNS has not reached this server yet. Run later: certbot --nginx -d $DOMAIN -d www.$DOMAIN"

echo
echo "Done. Visit https://$DOMAIN"
echo "Next: edit $APP_DIR/website/.env.production then run: pm2 restart deepshikha-website"
