# Project History

## April 8, 2026 — Stripe Compliance & Business Entity Branding

### Why
Rashad is setting up a Stripe account for Sternes Digital (DBA). Stripe requires the business website to:
- Display the business name matching what was provided to Stripe
- Be publicly viewable (not password-protected)
- Show contact information (direct channel, not just a contact form)
- Include refund/cancellation policy
- Describe products/services offered
- Have a privacy policy

The site previously used "Sternes.dev" and "Rashad Sternes" everywhere. "Sternes Digital" appeared nowhere.

### What Changed

**Branding updates across 6 files:**
- `components/Footer.tsx` — `STERNES.DEV` → `STERNES DIGITAL`, copyright → `© 2026 Sternes Digital · Dallas, TX`
- `components/NavRedesign.tsx` — `STERNES.DEV` → `STERNES DIGITAL`
- `app/terms/page.tsx` — All 8 entity references updated to "Sternes Digital"
- `app/privacy/page.tsx` — Entity references updated, identifies "Sternes Digital" operating at sternes.dev
- `app/layout.tsx` — `authors`, `creator`, `siteName` metadata → "Sternes Digital"
- `public/manifest.json` — name, short_name, description updated

**Kept "Sternes.dev" in:**
- Page titles (SEO — matches the domain people search for)
- OG image alt text

**Contact email:**
- Changed `hello@sternes.dev` → `support@sternes.dev` in Terms and Privacy pages

**Refund/cancellation policy added to Terms:**
- Non-refundable deposits
- Milestone payments non-refundable once deliverables completed
- 14-day written cancellation notice by either party
- Client pays for all completed work upon cancellation
- Full refund if Sternes Digital can't deliver
- Individual project agreements take precedence

### What Didn't Work — Email Forwarding

Goal: `support@sternes.dev` → `rashadsternes@gmail.com` with ability to reply as `support@sternes.dev` from Gmail.

**ImprovMX (free tier):**
- Account created, domain added, aliases configured
- DNS records added to Squarespace (MX + SPF TXT) — all verified green in ImprovMX dashboard
- Test emails failed: `550 5.1.3 Relay not permitted (#id-5.9.2) — ImprovMX`
- Also saw `5.1.1 The email account you tried to reach does not exist` when Gmail tried to send verification
- Root cause unclear — DNS was correct, forwarding showed active, but relay was refused
- Note: ImprovMX SMTP (sending) is premium-only, but forwarding (receiving) should work on free tier

**Cloudflare Email Routing:**
- Discovered it requires nameserver transfer to Cloudflare to function
- Rashad's DNS is on Squarespace (Google Domains nameservers) and he doesn't want to move it
- Not viable without nameserver migration

**Forward Email (forwardemail.net):**
- Blocked the domain as "newly created or transferred" via WHOIS/RDAP lookup
- Requires paid plan for domains flagged this way
- May work later once domain ages — worth retrying

**Gmail "Send mail as" setup (partially complete):**
- App password generated in Google account
- Gmail Settings > Accounts > Send mail as configuration started
- Blocked at verification step because forwarding wasn't working
- Plan: use `smtp.gmail.com` (port 587) with Gmail credentials + app password — free alternative to ImprovMX's premium SMTP

### Lessons Learned

1. **Cloudflare Email Routing is NOT just MX records** — it requires full nameserver transfer, unlike ImprovMX/Forward Email which work with MX records at any DNS provider
2. **New domains get flagged** — Forward Email blocks newly created/transferred domains to prevent abuse. Plan for this when setting up client sites.
3. **ImprovMX relay errors** — even with green DNS verification, relay can fail. The `550 5.1.3 Relay not permitted` error may be a timing issue or require support intervention.
4. **For client sites**: buy domains through Cloudflare so email routing is free and built-in, avoiding DNS transfer headaches entirely.
5. **Stripe doesn't test the email** — they visually check that a contact email is displayed on the site. The email doesn't need to be functional for account activation, but should be set up for real business use.

### Commits
1. `e2f1d92` — Update site branding to Sternes Digital for Stripe compliance
2. `f4d35b0` — Update nav header from Sternes.dev to Sternes Digital
3. `970425d` — Update values copy punctuation