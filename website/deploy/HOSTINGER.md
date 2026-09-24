# Putting the website on Hostinger Web Hosting (static)

Hostinger's Web Hosting plans (Premium / Business) run PHP, not Node.js, so the site is published as
plain HTML files. Everything visitors see works. Two things cannot:

- **`/admin`** (the enquiry inbox) is left out of this build — it needs a server.
- **The contact form** cannot save enquiries on the server. It opens the visitor's email app with all
  their details filled in, addressed to your sales address. If you prefer enquiries to arrive
  automatically, set `NEXT_PUBLIC_CONTACT_WEBHOOK` (below) and the form posts to that URL instead.

## 1. Build the files

```bash
cd website
NEXT_PUBLIC_SALES_EMAIL=you@yourdomain.com npm run build:static
```

The finished site is in `website/out/`. Settings are baked in at build time, so rebuild after changing any:

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SALES_EMAIL` | The address shown to visitors and used by the contact form |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `919876543210` — shows the WhatsApp buttons |
| `NEXT_PUBLIC_PHONE_NUMBER` | Shown and dialled, e.g. `+91 98765 43210` |
| `NEXT_PUBLIC_CONTACT_WEBHOOK` | Optional. Enquiries are POSTed here as JSON instead of opening the email app |
| `NEXT_PUBLIC_APP_URL` | The platform's address once it is hosted. Brings back the Sign in button |
| `NEXT_PUBLIC_LEGAL_ADDRESS`, `NEXT_PUBLIC_GRIEVANCE_OFFICER`, `NEXT_PUBLIC_JURISDICTION_CITY` | Shown on the legal pages |

## 2. Upload to Hostinger

1. hPanel → **Websites** → your site → **File manager**
2. Open **public_html** and delete what is already there (usually a `default.php` placeholder)
3. Upload the zip of everything inside `out/`, then **Extract** it

The files must sit directly in `public_html` — `public_html/index.html`, not `public_html/out/index.html`.
`.htaccess` is a hidden file: in File manager turn on **Settings → Show hidden files** to confirm it uploaded.

## 3. Connect the domain (bought at Namecheap)

In hPanel add the domain to this hosting plan (**Websites → Add website**, or **Domains → Add domain**),
then copy the **A record IP address** hPanel shows for it.

In Namecheap: **Domain List → Manage → Advanced DNS** → remove existing `@` and `www` records → add:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | the IP from hPanel | Automatic |
| CNAME Record | `www` | `yourdomain.com.` | Automatic |

Leave the nameservers on Namecheap BasicDNS. DNS usually takes 15–60 minutes.
(Alternative: in Namecheap choose **Custom DNS** and enter Hostinger's nameservers, `ns1.dns-parking.com`
and `ns2.dns-parking.com`. Then manage DNS in hPanel instead of Namecheap — do one or the other, not both.)

Finally, in hPanel go to **Security → SSL** and install the free certificate, then turn on **Force HTTPS**.

## 4. Publishing changes later

Rebuild and upload again:

```bash
cd website && npm run build:static
```

Delete the old files in `public_html` first so nothing stale is left behind.
