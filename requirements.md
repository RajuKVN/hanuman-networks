# Hanuman Networks — Revised Implementation Plan (Simplified)

## What changed and why

Firebase is gone entirely. No auth, no Firestore, no SDK, no rules. The admin panel is gone. The single source of truth is a **public GitHub Gist** containing `plans.json`. The operator edits it in the browser; the app fetches it fresh on each visit (with a 5-minute stale cache). Layout is now a responsive grid, not a single column. Complexity is roughly halved.

---

## 1. Tech Stack (final, trimmed)

| Concern | Library |
|---|---|
| Build | Vite 5 + React 18 + TypeScript 5 (strict) |
| UI | Chakra UI v2 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod + `@hookform/resolvers` |
| i18n | `i18next` + `react-i18next` + `i18next-browser-languagedetector` |
| Validation | Zod (env vars, form inputs, Gist response parsing) |
| Testing | Vitest + React Testing Library |
| Lint/Format | ESLint flat config + Prettier |
| Deploy | Vercel (static SPA, zero server) |

**Removed entirely:** Firebase, TanStack Router (use React Router v6 — simpler for a 1-page app), Zustand (local `useState` is enough), Framer Motion (Chakra transitions are sufficient), Husky/lint-staged (optional, add later).

---

## 2. Folder Structure

```
hanuman-networks/
├── .env.example
├── .gitignore
├── .prettierrc.json
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── config/
    │   ├── env.ts          # Zod-validates VITE_* vars at startup
    │   ├── theme.ts        # Chakra violet palette + dark mode
    │   └── queryClient.ts  # staleTime: 5min, retry: 1
    ├── i18n/
    │   ├── index.ts
    │   └── locales/
    │       ├── en.json
    │       └── te.json     # Telugu
    ├── types/
    │   └── plan.ts
    ├── schemas/
    │   └── plan.schema.ts  # Zod schema; Plan type inferred from it
    ├── lib/
    │   ├── gist.ts         # fetchPlans(): fetch + parse + validate
    │   └── whatsapp.ts     # buildWhatsAppUrl(phone, message)
    ├── hooks/
    │   ├── usePlans.ts     # useQuery wrapper over gist.ts
    │   └── useLanguage.ts  # lang toggle + localStorage persist
    ├── components/
    │   ├── ui/
    │   │   ├── GlassCard.tsx
    │   │   ├── LanguageToggle.tsx
    │   │   ├── LoadingState.tsx
    │   │   ├── EmptyState.tsx
    │   │   └── ErrorState.tsx
    │   └── layout/
    │       ├── AppShell.tsx
    │       └── Header.tsx
    ├── features/
    │   ├── plans/
    │   │   ├── PlanGrid.tsx          # responsive grid wrapper
    │   │   ├── PlanCard.tsx          # summary card (name, price, OTT count, popular badge)
    │   │   └── utils/sortPlans.ts
    │   ├── detail/
    │   │   ├── PlanDetailSheet.tsx   # bottom sheet / drawer
    │   │   ├── PlanDetailBody.tsx    # full OTT list, channels, validity
    │   │   └── PlanDetailHeader.tsx
    │   └── inquiry/
    │       ├── InquiryForm.tsx       # RHF + Zod: name, mobile, area
    │       ├── InquirySuccess.tsx    # brief confirmation, then auto-close
    │       └── utils/buildMessage.ts # emoji-formatted WhatsApp message
    ├── pages/
    │   └── HomePage.tsx
    └── utils/
        ├── format.ts       # ₹ formatting, phone display
        └── constants.ts    # query keys, breakpoints
```

---

## 3. Data Model

The Gist contains a single JSON file, `plans.json`:

```jsonc
{
  "whatsappNumber": "919XXXXXXXXX",
  "operatorName": "Hanuman Networks",
  "plans": [
    {
      "id": "smartplay-gold-spl",
      "name": "SmartPlay Gold SPL",
      "price": 249,
      "ottCount": 29,
      "ottApps": ["JIO HOTSTAR", "ZEE5", "SONY LIV", "..."],
      "tvChannels": null,
      "validityDays": 30,
      "speedMbps": null,
      "category": "premium",
      "isPopular": true,
      "sortOrder": 1
    }
    // ...9 more plans
  ]
}
```

The Zod schema in `src/schemas/plan.schema.ts` validates this exactly. Any malformed Gist response shows the `ErrorState` component instead of crashing.

**Admin workflow:** operator opens the Gist URL → edits prices/OTT lists inline → saves. On the next app visit (or after 5-minute cache expiry), the customer sees updated data. No deployment, no code change, no login.

---

## 4. Responsive Layout

Cards display in a CSS grid driven by Chakra's `SimpleGrid`:

```
mobile  (<480px)  → 1 column
tablet  (≥768px)  → 2 columns
desktop (≥1200px) → 3 columns
```

**Card anatomy (summary — what's visible without tapping):**
- Plan name + category chip
- Price (large, ₹ formatted)
- OTT count badge + first 4 OTT logos as text pills
- "Popular" glow ring on featured card
- Channels / validity row
- "View Details" button

**Tap → Plan Detail Sheet (bottom drawer on mobile, centered modal on desktop):**
- Full plan name, price breakdown
- Complete OTT app list (all chips)
- Channel count, validity, speed if present
- Inquiry form inline (name, mobile, area)
- "Send via WhatsApp" button

This keeps the grid scannable and saves full detail for intentional taps.

---

## 5. Implementation Phases

### Phase 0 — Scaffold (~30 min)
- `npm create vite@latest . -- --template react-ts`
- Install all deps in one shot (list in README)
- Configure `tsconfig` strict + path aliases (`@/*` → `src/*`)
- ESLint flat config + Prettier
- `vercel.json` SPA rewrite + security headers

### Phase 1 — Design system (~2 hrs)
- `config/theme.ts`: violet palette (`#7c3aed` primary, `#0d0618` dark base), semantic tokens, dark-mode-only global config
- `styles/globals.css`: Inter font, body reset, 3 keyframes (`fadeSlideUp`, `cardEntrance`, `pulse`), CSS easing vars
- `components/ui/GlassCard.tsx`: Chakra `Box` with `backdropFilter`, violet-tinted border, `isFeatured` prop → glow ring
- `components/layout/AppShell.tsx` + `Header.tsx`: sticky header with operator name, language toggle, subtle blur

### Phase 2 — i18n (~1 hr)
- `i18n/index.ts`: init with `LanguageDetector`, fallback `en`
- `en.json` + `te.json`: flat keys by feature (`home.*`, `inquiry.*`, `plan.*`, `common.*`)
- `useLanguage.ts`: `{ lang, setLang }`, persisted to localStorage
- `LanguageToggle.tsx`: EN / తె pill in header

### Phase 3 — Gist data layer (~1 hr)
- `config/env.ts`: Zod-validates `VITE_GIST_URL` + `VITE_DEFAULT_WHATSAPP_NUMBER` at startup
- `lib/gist.ts`: `fetchPlans()` — `fetch(gistRawUrl)` → `JSON.parse` → `configSchema.parse()` → typed result
- `config/queryClient.ts`: `staleTime: 5 * 60 * 1000`, `refetchOnWindowFocus: false`, `retry: 1`
- `hooks/usePlans.ts`: thin `useQuery` wrapper, exposes `{ plans, settings, isLoading, error }`
- `schemas/plan.schema.ts`: single Zod source of truth; `Plan` type = `z.infer<typeof planSchema>`

### Phase 4 — Plan grid and cards (~half-day)
- `pages/HomePage.tsx`: fetches via `usePlans`, routes loading/empty/error to matching component, renders `PlanGrid`
- `features/plans/PlanGrid.tsx`: Chakra `SimpleGrid` with responsive `columns` prop, staggered card entrance via CSS `animation-delay`
- `features/plans/PlanCard.tsx`: composed of `PlanCardHeader`, `PlanPrice`, `PlanOTTPreview` (first 4 chips + "+N more"), `PlanMeta`, `ViewDetailsButton` — clicking opens `PlanDetailSheet`
- `utils/sortPlans.ts`: popular first → `sortOrder` → price ascending
- All animations respect `prefers-reduced-motion`

### Phase 5 — Detail sheet + inquiry (~half-day)
- `features/detail/PlanDetailSheet.tsx`: Chakra `Drawer` (`placement="bottom"` on mobile, `size="md"` centered on desktop via `useBreakpointValue`)
- `features/detail/PlanDetailBody.tsx`: full OTT chip list (wrapping), channels, validity, speed row
- `features/inquiry/InquiryForm.tsx`: RHF fields — `name` (required), `mobile` (10-digit Indian, Zod regex), `area` (required). Inline Zod errors, disabled while submitting
- `features/inquiry/utils/buildMessage.ts`: assembles emoji-formatted Telugu/English template from plan + form data
- `lib/whatsapp.ts`: `buildWhatsAppUrl(phone, message)` → `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
- On submit: build URL → `window.open(url, '_blank')` → show `InquirySuccess` → auto-close drawer after 1.5s
- WhatsApp number comes from the Gist `settings.whatsappNumber` field, falls back to `VITE_DEFAULT_WHATSAPP_NUMBER` env var

### Phase 6 — Hardening + deploy (~half-day)
- `ErrorBoundary` wrapping the app root
- Static `<meta>` OG tags in `index.html`
- `robots.txt`, `favicon.svg` in `public/`
- `vercel.json`: SPA rewrite, `Cache-Control: max-age=31536000,immutable` for hashed assets, security headers
- Bundle check: target initial JS < 200 KB gzip. Lazy-load the detail sheet if needed.
- Lighthouse mobile target: Performance ≥ 90, Accessibility ≥ 95

---

## 6. Env Vars (`.env.example`)

```
VITE_GIST_URL=https://gist.githubusercontent.com/your-user/abc123/raw/plans.json
VITE_DEFAULT_WHATSAPP_NUMBER=919XXXXXXXXX
VITE_OPERATOR_NAME=Hanuman Networks
```

No service account keys. No secrets beyond these three public-ish values.

---

## 7. Admin Guide (README section)

The entire "admin panel" is three steps:

1. Go to `gist.github.com` and open the `plans.json` file
2. Edit prices, OTT app names, or the `isPopular` flag directly in the browser
3. Click Save — customers see the changes within 5 minutes (cache expiry)

To change the WhatsApp number: edit the `whatsappNumber` field in the same JSON file. No code change, no redeployment.

---