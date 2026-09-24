# Putting the website on a Hostinger VPS with a Namecheap domain

The site is a Next.js app, so it needs Node.js. Hostinger's **Web Hosting** plans (Premium, Business)
run PHP only and cannot run it. Use a **Hostinger VPS** — KVM 1 is enough — with **Ubuntu 24.04**.

On a VPS everything works, including the contact form and the `/admin` enquiry inbox, because the
server can write files (enquiries are saved to `website/data/leads.json`).

## 1. Point the domain at the server (Namecheap)

Copy the VPS IP address from hPanel, then in Namecheap:

**Domain List → Manage → Advanced DNS**, delete any existing records for `@` and `www`, then add:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | your VPS IP | Automatic |
| A Record | `www` | your VPS IP | Automatic |

Leave the nameservers as **Namecheap BasicDNS**. Changes usually take 15–60 minutes.

Check it has taken effect (from your own computer):

```bash
nslookup yourdomain.com
```

It should print the VPS IP.

## 2. Set the site up on the VPS

Connect over SSH (hPanel shows the root password, or use its Browser terminal):

```bash
ssh root@YOUR_VPS_IP
```

Then run:

```bash
curl -fsSL https://raw.githubusercontent.com/TechAero04/creem/deepshikha-main/website/deploy/setup-server.sh -o setup-server.sh
bash setup-server.sh yourdomain.com
```

It installs Node.js, nginx and pm2, builds the site, starts it on boot, and requests a free HTTPS
certificate. Run it **after** DNS points at the server, otherwise the certificate step fails — if it
does, fix DNS and run `certbot --nginx -d yourdomain.com -d www.yourdomain.com`.

## 3. Fill in your settings

```bash
nano /var/www/deepshikha/website/.env.production
pm2 restart deepshikha-website
```

| Variable | What it does |
| --- | --- |
| `ADMIN_PASSWORD` | Switches on `/admin` (8+ characters) |
| `NEXT_PUBLIC_SALES_EMAIL` | The address shown to visitors |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `919876543210` — shows the WhatsApp buttons |
| `NEXT_PUBLIC_PHONE_NUMBER` | Shown and dialled, e.g. `+91 98765 43210` |
| `NEXT_PUBLIC_APP_URL` | The platform's address, once it is hosted. Brings back the Sign in button |
| `NEXT_PUBLIC_LEGAL_*` | Address, grievance officer and city on the legal pages |

`NEXT_PUBLIC_*` values are baked in during the build, so after changing one run
`cd /var/www/deepshikha/website && npm run build && pm2 restart deepshikha-website`.

## 4. Publishing changes later

```bash
bash /var/www/deepshikha/website/deploy/update.sh
```

## Everyday commands

| Command | What it does |
| --- | --- |
| `pm2 status` | Is the site running? |
| `pm2 logs deepshikha-website` | Live logs |
| `pm2 restart deepshikha-website` | Restart |
| `systemctl reload nginx` | Reload the web server |

## Backing up enquiries

Contact-form enquiries live in `/var/www/deepshikha/website/data/leads.json`. Copy that file to keep
them; it holds personal data, so treat it carefully and never commit it.
