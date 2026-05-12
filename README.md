# Hanuman Networks — Cable TV, Internet & OTT Plan Browser

A fast, mobile-first React app that lets customers browse Internet, OTT, and Internet+OTT combo plans across three tabbed views, and send WhatsApp inquiries in one tap.

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

The file now has **three sections**: `ottPlans`, `internetPlans`, and `comboPlans`.  
Each plan uses a `pricing` array so you can offer monthly and multi-duration prices.

```json
{
  "whatsappNumber": "919876543210",
  "operatorName": "Hanuman Networks",

  "ottPlans": [
    {
      "id": "smartplay-gold-spl",
      "type": "ott",
      "name": "SmartPlay Gold SPL",
      "pricing": [{ "label": "Monthly", "months": 1, "price": 249 }],
      "ottCount": 29,
      "ottApps": ["JIO HOTSTAR", "ZEE5", "SONY LIV", "SUN NXT", "DISCOVERY+"],
      "category": "premium",
      "isPopular": true,
      "sortOrder": 1
    }
  ],

  "internetPlans": [
    {
      "id": "internet-40mbps",
      "type": "internet",
      "name": "40 Mbps Broadband",
      "speedMbps": 40,
      "pricing": [{ "label": "Monthly", "months": 1, "price": 450 }],
      "category": "basic",
      "isPopular": false,
      "sortOrder": 1
    }
  ],

  "comboPlans": [
    {
      "id": "smartplay-gold-pack",
      "type": "combo",
      "name": "SmartPlay Gold Pack",
      "speedMbps": 40,
      "tvChannels": 350,
      "ottCount": 14,
      "ottApps": ["AHA TELUGU", "SONY LIV", "JIO HOTSTAR", "SUN NXT", "ZEE5", "FANCODE"],
      "pricing": [
        { "label": "Monthly",   "months": 1,  "price": 750  },
        { "label": "3 Months",  "months": 3,  "price": 2249 },
        { "label": "6 Months",  "months": 6,  "price": 4499 },
        { "label": "12 Months", "months": 12, "price": 8899 }
      ],
      "category": "premium",
      "isPopular": true,
      "sortOrder": 1
    }
  ]
}
```

> **Backward compatible**: the old flat `"plans": [...]` array is still accepted and auto-converted to OTT plans internally.

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
