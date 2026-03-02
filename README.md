# Utkrast Foundation Website

Official website for **Utkrast Foundation** — empowering underprivileged women and children through education, skill development, and livelihood programs across India.

**Founded by:** Sadrun Nisha & Safia Parveen  
**Contact:** utkrastfoundation61@gmail.com  
**Instagram:** [@utkrast_foundation](https://www.instagram.com/utkrast_foundation)

---

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite 5
- **Styling:** Tailwind CSS v3 + shadcn/ui
- **Routing:** React Router v6
- **Backend:** Vercel Serverless Functions (Node.js)
- **Email:** Nodemailer (Gmail SMTP)
- **Payments:** Razorpay (ready to activate — see below)
- **Hosting:** Vercel

---

## Project Structure

```
utkrast-foundation/
├── api/
│   ├── contact.ts        # Contact form → sends email
│   └── donate.ts         # Donation order creation (Razorpay/Stripe)
├── src/
│   ├── assets/           # Images (founders, programs, hero)
│   ├── components/       # Reusable UI components
│   ├── hooks/
│   │   └── useContactForm.ts   # Form state + validation + API
│   └── pages/            # Route-level page components
├── .env.example          # Environment variable template
├── vercel.json           # Security headers + routing
└── index.html            # SEO metadata + Schema.org JSON-LD
```

---

## Quick Start

### 1. Install

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=utkrastfoundation61@gmail.com
SMTP_PASS=your_gmail_app_password   # See "Gmail App Password" section below
CONTACT_EMAIL=utkrastfoundation61@gmail.com
```

### 3. Run

```bash
# Frontend only (API routes won't work):
npm run dev

# With API routes (recommended):
npm install -g vercel
vercel dev
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Add Environment Variables** in Vercel Dashboard → Project → Settings → Environment Variables:
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`

**Add Custom Domain** in Vercel → Settings → Domains → add `utkrastfoundation.org`

---

## Activating Razorpay (Donations)

1. Sign up at [razorpay.com](https://razorpay.com) and complete KYC for your NGO
2. Install: `npm install razorpay`
3. Add keys to env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `VITE_RAZORPAY_KEY_ID`
4. Uncomment the Razorpay block in `api/donate.ts`
5. Add checkout script to `index.html`: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`
6. In `src/pages/Donate.tsx`, use the returned `orderId` to open `new Razorpay(options).open()`

---

## Gallery Cloud Storage (Optional)

Photos are currently stored in memory. For persistence, use Cloudinary:

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Create an unsigned upload preset named `utkrast_gallery`
3. Add to env: `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`
4. In `Gallery.tsx`, upload via: `https://api.cloudinary.com/v1_1/{cloud}/image/upload`

---

## Gmail App Password

Standard Gmail password won't work with SMTP. Create an App Password:

1. [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification (must be ON)
2. Security → App Passwords → Select "Mail" + "Other"
3. Copy the 16-character password → use as `SMTP_PASS`

---

## Security Headers (via vercel.json)

| Header | Purpose |
|--------|---------|
| X-Content-Type-Options | Prevents MIME sniffing |
| X-Frame-Options: DENY | Prevents clickjacking |
| Strict-Transport-Security | Forces HTTPS |
| Content-Security-Policy | Controls resource loading |
| Referrer-Policy | Limits referrer data |

Contact form API: rate limited to **5 requests/IP/minute** + server-side validation.

---

## Scripts

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview build locally
npm run test     # Run tests
vercel dev       # Dev server with API routes
```

---

MIT © Utkrast Foundation
