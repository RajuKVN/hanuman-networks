import { z } from 'zod';

/* ── Pricing option ─────────────────────────────────────────────────── */
export const pricingOptionSchema = z.object({
  label: z.string().min(1),   // "Monthly" | "3 Months" | "6 Months" | "12 Months"
  months: z.number().int().positive(),
  price: z.number().nonnegative(),
});
export type PricingOption = z.infer<typeof pricingOptionSchema>;

/* ── Pricing array: validates unique labels ───────────────────────── */
const pricingArraySchema = z
  .array(pricingOptionSchema)
  .min(1)
  .superRefine((items, ctx) => {
    const seen = new Set<string>();
    items.forEach((item, idx) => {
      if (seen.has(item.label)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [idx, 'label'],
          message: `Duplicate pricing label "${item.label}". Each pricing option must have a unique label (e.g. "Monthly", "3 Months", "6 Months", "12 Months").`,
        });
      }
      seen.add(item.label);
    });
  });

/* ── Base fields shared by all plan types ─────────────────────────── */
const basePlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['basic', 'standard', 'premium', 'ultra']),
  isPopular: z.boolean(),
  sortOrder: z.number().int(),
  pricing: pricingArraySchema,
  note: z.string().optional(),
});

/* ── OTT plan (pure streaming, no internet) ──────────────────────── */
export const ottPlanSchema = basePlanSchema.extend({
  type: z.literal('ott'),
  ottCount: z.number().int().nonnegative(),
  ottApps: z.array(z.string()),
});

/* ── Internet plan (WiFi only, no OTT) ──────────────────────────── */
export const internetPlanSchema = basePlanSchema.extend({
  type: z.literal('internet'),
  speedMbps: z.number().positive(),
});

/* ── Combo plan (Internet + OTT/Cable TV bundle) ─────────────────── */
export const comboPlanSchema = basePlanSchema.extend({
  type: z.literal('combo'),
  speedMbps: z.number().positive(),
  ottCount: z.number().int().nonnegative(),
  ottApps: z.array(z.string()),
  tvChannels: z.number().int().nonnegative().nullable(),
  tvChannelList: z.array(z.string()).optional().default([]),
});

/* ── Discriminated union ─────────────────────────────────────────── */
export const unifiedPlanSchema = z.discriminatedUnion('type', [
  ottPlanSchema,
  internetPlanSchema,
  comboPlanSchema,
]);

export type OttPlan      = z.infer<typeof ottPlanSchema>;
export type InternetPlan = z.infer<typeof internetPlanSchema>;
export type ComboPlan    = z.infer<typeof comboPlanSchema>;
export type UnifiedPlan  = z.infer<typeof unifiedPlanSchema>;

/** Alias kept for import compatibility across the codebase. */
export type Plan = UnifiedPlan;

/* ── Legacy flat plan (backward compatibility) ───────────────────── */
export const legacyPlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  ottCount: z.number().int().nonnegative(),
  ottApps: z.array(z.string()),
  tvChannels: z.number().int().nonnegative().nullable(),
  validityDays: z.number().int().positive(),
  speedMbps: z.number().positive().nullable(),
  category: z.enum(['basic', 'standard', 'premium', 'ultra']),
  isPopular: z.boolean(),
  sortOrder: z.number().int(),
});
export type LegacyPlan = z.infer<typeof legacyPlanSchema>;

/* ── Config schema (supports new sectional + legacy flat formats) ─── */
export const configSchema = z.object({
  whatsappNumber: z.string().regex(/^91\d{10}$/, 'Must be 91 + 10 digits'),
  operatorName: z.string().min(1),
  ottPlans:      z.array(ottPlanSchema).optional().default([]),
  internetPlans: z.array(internetPlanSchema).optional().default([]),
  comboPlans:    z.array(comboPlanSchema).optional().default([]),
  plans:         z.array(legacyPlanSchema).optional(),
});

export type AppConfig = z.infer<typeof configSchema>;

/* ── Normalized runtime shape returned to UI ─────────────────────── */
export interface AppConfigNormalized {
  whatsappNumber: string;
  operatorName: string;
  plans: UnifiedPlan[];
}
