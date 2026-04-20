# Hanuman Networks — Cable & OTT Plan Browser

A fast, mobile-first React app that lets customers browse cable TV and OTT subscription plans and send WhatsApp inquiries in one tap.

---

## Quick Start (Local Dev)

```bash
# 1. Copy env template and fill in real values
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment Variables (`.env`)

| Variable | Description |
|---|---|
| `VITE_GIST_URL` | Raw URL of your GitHub Gist `plans.json` |
| `VITE_DEFAULT_WHATSAPP_NUMBER` | Fallback WhatsApp number (`91` + 10 digits) |
| `VITE_OPERATOR_NAME` | Brand name shown in the header |

---

## Admin Guide — Editing Plans (No Code Required)

Your entire "admin panel" is a GitHub Gist JSON file.

### One-time Setup

1. Go to [gist.github.com](https://gist.github.com) and sign in
2. Create a new **secret** (or public) Gist
3. Name the file exactly `plans.json`
4. Paste and fill the template below
5. Click **Create Gist**
6. Click **Raw** — copy that URL into `VITE_GIST_URL`

### `plans.json` Template

```json
{
  "whatsappNumber": "919876543210",
  "operatorName": "Hanuman Networks",
  "plans": [
    {
      "id": "smartplay-gold-spl",
      "name": "SmartPlay Gold SPL",
      "price": 249,
      "ottCount": 29,
      "ottApps": ["JIO HOTSTAR", "ZEE5", "SONY LIV", "SUN NXT", "DISCOVERY+"],
      "tvChannels": null,
      "validityDays": 30,
      "speedMbps": null,
      "category": "premium",
      "isPopular": true,
      "sortOrder": 1
    }
  ]
}
```

### Day-to-Day Updates

1. Open your Gist URL and click **Edit**
2. Change any prices, OTT app names, or `isPopular` flags
3. Click **Save** — customers see changes within **5 minutes** (cache window)

To change the WhatsApp number: edit `whatsappNumber` in the same file. No code change, no redeployment.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel --prod
```

Add the three env vars in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## Tech Stack

| Concern | Library |
|---|---|
| Build | Vite 6 + React 18 + TypeScript 5 (strict) |
| UI | Chakra UI v3 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| i18n | i18next (EN + Telugu) |
| Deploy | Vercel (static SPA) |
