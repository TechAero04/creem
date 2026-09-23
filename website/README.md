# Deepshikha AI Automation — website

Marketing site: landing page, pricing, subscribe, guide, contact, legal pages and an admin enquiry inbox.
Built with Next.js. It is a standalone app inside this repository and is **not** part of the platform's bun/turbo workspaces.

## Run locally

```bash
cd website
npm install
npm run dev      # http://localhost:3100
```

## Deploying to Vercel

In the Vercel project settings:

| Setting | Value |
| --- | --- |
| Root Directory | `website` |
| Include source files outside of the Root Directory | off |

Setting the Root Directory is required. The repository root is the automation platform's
monorepo and has no build script, so a deployment from the root fails.

The framework, install command and build command come from `website/vercel.json`, which is
committed. It exists because Vercel otherwise detects the monorepo's `turbo.json` and bun
settings at the repository root and tries to run `bun install` and `turbo run build`, which
fails with "No locally installed 'turbo' found in your repo". If you override the install or
build command in the Vercel dashboard, leave both fields empty so `vercel.json` stays in charge.

## Environment variables

None are required to build. Set these to switch on the matching features.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Where the platform runs, for Sign in / Create workspace links (default `http://localhost:4200`) |
| `NEXT_PUBLIC_SALES_EMAIL` | Address shown for sales enquiries |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `919876543210`. Shows the WhatsApp buttons |
| `NEXT_PUBLIC_PHONE_NUMBER` | Shown and dialled, e.g. `+91 98765 43210` |
| `NEXT_PUBLIC_LEGAL_ADDRESS` | Registered address on the legal pages |
| `NEXT_PUBLIC_LEGAL_EMAIL` | Contact for legal and privacy requests |
| `NEXT_PUBLIC_GRIEVANCE_OFFICER` | Grievance officer's name (expected under Indian rules) |
| `NEXT_PUBLIC_JURISDICTION_CITY` | City named for courts in the Terms |
| `ADMIN_PASSWORD` | Turns on `/admin` (8+ characters) |
| `LEADS_WEBHOOK_URL` | **Required on Vercel.** Where contact-form enquiries are sent |
| `LEADS_DIR` | Overrides where enquiries are stored when running on a normal server |

`NEXT_PUBLIC_*` values are baked in at build time, so change them and redeploy.

## Where contact enquiries go

- **Normal server** (your own VM, Docker, `npm start`): saved to `website/data/leads.json` and listed at `/admin`.
- **Vercel and other serverless hosts:** the filesystem is read-only, so nothing can be saved there.
  Set `LEADS_WEBHOOK_URL` and each enquiry is POSTed as JSON to that URL — point it at an automation
  in the platform, a shared inbox tool, or any endpoint you own. `/admin` then shows a notice instead of a list.
- If neither is available, the form tells the visitor to email instead rather than silently losing the message.

`website/data/` holds personal data and is gitignored. Keep it that way.
