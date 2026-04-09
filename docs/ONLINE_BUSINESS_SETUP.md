# Online Business Setup Checklist

A checklist for getting a business online and ready to accept payments. Built from firsthand experience setting up Sternes Digital for Stripe.

---

## 1. Domain & DNS
- [ ] Purchase domain (recommend Cloudflare for free email routing, or register elsewhere)
- [ ] Configure DNS: A record → hosting provider, CNAME for www
- [ ] HTTPS enabled (automatic with Vercel, Netlify, etc.)

## 2. Website — Core Content
- [ ] Business name displayed prominently (must match payment processor records)
- [ ] Product/service descriptions — what you sell, clearly stated
- [ ] Pricing (if applicable) with terms and conditions
- [ ] Business address (at minimum city/state)
- [ ] Contact information — direct channel (email, phone) not just a contact form

## 3. Legal Pages
- [ ] **Privacy Policy** — how you collect, use, and protect customer data
  - Identify the business entity by name
  - List third-party services that process data (payment processor, analytics, etc.)
  - Include contact email for data requests
- [ ] **Terms of Service** — rules for using the site and services
  - Business entity name and operating domain
  - Description of services
  - Intellectual property ownership
  - Limitation of liability
  - Governing law and jurisdiction
- [ ] **Refund/Cancellation Policy** — required for payment processing
  - Deposit terms (refundable or non-refundable)
  - Cancellation process and notice period
  - What happens to payments for completed vs. undelivered work
  - How refunds are handled if the business can't deliver

## 4. Email Setup
- [ ] Business email address (e.g., support@yourdomain.com)
- [ ] Email forwarding to personal inbox (if solo operator)
- [ ] "Send as" configured in Gmail/email client so replies use business address
- **Recommended approach**:
  - If domain is on Cloudflare → use Cloudflare Email Routing (free, built-in)
  - If domain is elsewhere → use ImprovMX or Forward Email (add MX records at DNS provider)
  - For Gmail "Send as" → use `smtp.gmail.com` with app password (free, no premium plan needed)
- **Watch out for**: newly registered domains getting flagged by forwarding services

## 5. Payment Processor (Stripe)
Stripe specifically checks for:
- [ ] Website is live and publicly viewable (not password-protected)
- [ ] Business name on site matches what you provided to Stripe
- [ ] Product/service descriptions present
- [ ] Contact information visible (email, phone, or chat — not just a form)
- [ ] Refund/return/cancellation policy
- [ ] Privacy policy
- [ ] HTTPS on payment pages
- [ ] Business address

### Stripe Account Setup
- [ ] Create Stripe account with business details
- [ ] Provide EIN or SSN (depending on business type)
- [ ] Link bank account for payouts
- [ ] Verify identity (driver's license or passport)
- [ ] Submit website URL for review
- [ ] Wait for account activation

## 6. Business Fundamentals (outside this codebase)
- [ ] Business entity formed (LLC, sole prop, etc.)
- [ ] EIN obtained from IRS (if applicable)
- [ ] DBA filed (if operating under a different name)
- [ ] Business bank account opened
- [ ] Accounting/bookkeeping system set up
- [ ] Business insurance (if applicable)

---

## Client Handoff Notes

When onboarding a client who needs to accept payments:

1. **Domain**: Have them buy through Cloudflare or purchase on their behalf. This gives free email routing without DNS transfer headaches.
2. **Email**: Set up forwarding during site build so it's ready at launch. Don't wait — forwarding services may flag new domains.
3. **Legal pages**: Build Terms, Privacy, and Refund policies into the site from the start. Tailor refund policy to their specific business model.
4. **Stripe**: Client handles account creation (needs their SSN/EIN, bank details). Site just needs to pass Stripe's visual review.
5. **Timeline**: Domain + DNS propagation can take up to 48 hours. Email forwarding may need time to settle. Start these early.

---

*Last updated: April 8, 2026*
*Source: Sternes Digital setup experience*