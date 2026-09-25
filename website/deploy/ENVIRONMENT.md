# Environment variables

Two separate things have environment variables:

1. **The website** (`website/`) — the marketing site you are hosting on Hostinger.
2. **The platform** (`packages/server/api`, the Activepieces-based product) — not hosted publicly yet.

---

## 1. Website

None of these are required. Every one has a fallback, so the site builds and runs with no
environment file at all. Set them to replace placeholders with your real details.

### How to set them

| Where you run the site | How to set |
| --- | --- |
| Hostinger (static files) | Put them on the build command, then upload the new `out/` folder. They are baked into the HTML at build time. |
| Vercel | Project → Settings → Environment Variables, then redeploy. |
| Your own machine | `website/.env.local` (git-ignored), or inline on the command. |

Static rebuild with your values:

```bash
cd website
NEXT_PUBLIC_SALES_EMAIL=sales@deepsikhaitconsultancy.info \
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210 \
NEXT_PUBLIC_PHONE_NUMBER="+91 98765 43210" \
npm run build:static
```

> `NEXT_PUBLIC_*` values are visible in the page source. Never put a password, API key or
> secret in one. Secrets go in the non-public variables below, and those only work on a real
> server (Vercel / VPS), never on Hostinger static hosting.

### Public — contact details

| Variable | Default if unset | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SALES_EMAIL` | `sales@deepshikha.ai` | The email address shown across the site and used for every "email us" link and the contact form's mail fallback. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | empty → WhatsApp button hidden | Country code + number, digits only, e.g. `919876543210`. Non-digits are stripped automatically. |
| `NEXT_PUBLIC_PHONE_NUMBER` | empty → phone button hidden | Shown exactly as you type it and used for the dial link, e.g. `+91 98765 43210`. |

### Public — legal pages

Used on `/terms`, `/privacy` and `/refund-policy`. An empty value hides that line instead of
printing a placeholder.

| Variable | Default if unset | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_LEGAL_EMAIL` | falls back to `NEXT_PUBLIC_SALES_EMAIL` | Contact address for legal and privacy notices. |
| `NEXT_PUBLIC_LEGAL_ADDRESS` | empty → line hidden | Registered business address. |
| `NEXT_PUBLIC_GRIEVANCE_OFFICER` | empty → line hidden | Grievance Officer name, expected under the Indian IT Act and DPDP Act. |
| `NEXT_PUBLIC_JURISDICTION_CITY` | empty → generic wording | City whose courts have jurisdiction, e.g. `Bengaluru`. |

### Public — link to the platform

| Variable | Default if unset | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:4200` | Address of the actual product. Set it only once the platform is live on a public URL. While it points at localhost, or is unset, every "Sign in" and "Start trial" button sends visitors to `/contact` instead of a link that would not open for them. Set it to e.g. `https://app.deepsikhaitconsultancy.info` and those buttons become `…/sign-in` and `…/sign-up`. |

### Public — contact form delivery

| Variable | Default if unset | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_WEBHOOK` | empty | Static build only. Give it a webhook URL (Google Apps Script, Formspree, Zapier or Make catch hook, your own endpoint) and the form POSTs each enquiry there as JSON. Without it, submitting opens the visitor's email app with the message pre-filled, which means they must press send and some will not. |
| `NEXT_PUBLIC_STATIC` | unset | Set to `1` automatically by `npm run build:static`. Do not set it by hand. It makes links render as plain `<a>` tags, which static hosting needs, and switches the form to webhook or email mode. |

### Server-only — do not use on Hostinger static hosting

These only work where Node.js runs the site: Vercel, a VPS, or `npm start` locally. They are
never sent to the browser.

| Variable | Default if unset | What it does |
| --- | --- | --- |
| `ADMIN_PASSWORD` | empty → `/admin` cannot be logged into | Password for the `/admin` enquiry inbox, and the key used to sign the admin session cookie. Use something long and random. |
| `LEADS_WEBHOOK_URL` | empty | Server-side webhook that the `/api/contact` route forwards each enquiry to. Kept out of the browser, unlike `NEXT_PUBLIC_CONTACT_WEBHOOK`. |
| `LEADS_DIR` | `website/data` | Folder where enquiries are written as files. That folder is git-ignored and must stay that way — it holds personal data. |

### Set for you by the tooling

You never set these yourself; they are listed so the behaviour is not a mystery.

| Variable | Set by | Effect |
| --- | --- | --- |
| `STATIC_EXPORT` | `npm run build:static` | Turns on `output: "export"`, `trailingSlash` and unoptimized images in `next.config.ts`. |
| `NODE_ENV` | Next.js | `production` makes the admin session cookie `Secure`. |
| `VERCEL`, `NETLIFY`, `AWS_LAMBDA_FUNCTION_NAME` | the host | Any of these being present means the filesystem is read-only, so enquiries go to the webhook instead of to disk, and `/admin` shows a banner saying so. |

### What the current Hostinger zip was built with

```
NEXT_PUBLIC_SALES_EMAIL = sales@deepsikhaitconsultancy.info
NEXT_PUBLIC_STATIC      = 1     (set by the build script)
STATIC_EXPORT           = 1     (set by the build script)
```

Everything else was left at its default. That is why the WhatsApp and phone buttons are hidden,
the legal address and grievance officer lines do not appear, sign-up goes to `/contact`, and the
contact form opens the visitor's email app.

---

## 2. Platform (Activepieces-based product)

Every platform variable is prefixed `AP_`. Full upstream reference:
<https://www.activepieces.com/docs/install/configuration/environment-variables>

### Required in production

| Variable | Notes |
| --- | --- |
| `AP_ENCRYPTION_KEY` | 32 hex characters. The server refuses to boot without a valid one. Generate with `openssl rand -hex 16`. Losing it makes every saved app connection unreadable. |
| `AP_JWT_SECRET` | Signs login tokens. Long random string. Changing it logs everyone out. |
| `AP_FRONTEND_URL` | Public address of the platform, e.g. `https://app.deepsikhaitconsultancy.info`. Webhook URLs and email links are built from it. |
| `AP_POSTGRES_*` | `HOST`, `PORT`, `DATABASE`, `USERNAME`, `PASSWORD`, plus `AP_POSTGRES_USE_SSL` and `AP_POSTGRES_SSL_CA`. Or a single `AP_POSTGRES_URL`. |
| `AP_REDIS_URL` | Or `AP_REDIS_HOST`, `AP_REDIS_PORT`, `AP_REDIS_PASSWORD`, `AP_REDIS_USE_SSL`. |

### Common settings

| Variable | Default | Notes |
| --- | --- | --- |
| `AP_EDITION` | `ce` | `ce` (community), `ee`, `cloud`. |
| `AP_PORT` | `3000` | API port. |
| `AP_DB_TYPE` | `POSTGRES` | `PGLITE` for a zero-setup local file database. |
| `AP_REDIS_TYPE` | `STANDALONE` | `MEMORY` for local development with no Redis server. |
| `AP_ENVIRONMENT` | `prod` | `dev`, `prod` or `testing`. |
| `AP_EXECUTION_MODE` | `UNSANDBOXED` | `SANDBOXED` isolates flow code; needs a suitable container. |
| `AP_CONTAINER_TYPE` | `WORKER_AND_APP` | Split into `APP` and `WORKER` when scaling out. |
| `AP_WORKERS` | `1` | Concurrent workers per container. |
| `AP_ALLOW_OPEN_SIGN_UP` | unset (closed) | Whether strangers can create accounts. Keep it off for a paid product. |
| `AP_TELEMETRY_ENABLED` | `true` | Set `false` to stop usage telemetry. |
| `AP_FILE_STORAGE_LOCATION` | `DB` | `S3` offloads run logs and files; then set `AP_S3_BUCKET`, `AP_S3_REGION`, `AP_S3_ENDPOINT`, `AP_S3_ACCESS_KEY_ID`, `AP_S3_SECRET_ACCESS_KEY`. |
| `AP_EXECUTION_DATA_RETENTION_DAYS` | `30` | How long run history is kept. |
| `AP_FLOW_TIMEOUT_SECONDS` | `600` | Maximum run length. |
| `AP_MAX_FILE_SIZE_MB` | `25` | Upload limit. |
| `AP_SMTP_HOST`, `_PORT`, `_USERNAME`, `_PASSWORD`, `_SENDER_EMAIL`, `_SENDER_NAME` | unset | Needed for invitations, password resets and email alerts. |
| `AP_SSRF_ALLOW_LIST` | unset | Private IPs that outbound HTTP is allowed to reach. |
| `AP_LOG_LEVEL`, `AP_LOG_PRETTY` | `info`, `false` | Logging. |
| `AP_DEV_PIECES` | unset | Comma-separated piece names to load from source during development. |

### What the local dev stack runs with

```
AP_DB_TYPE=PGLITE        # file-backed Postgres, nothing to install
AP_REDIS_TYPE=MEMORY     # no Redis server to install
```
