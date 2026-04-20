import { z } from 'zod';

export const planSchema = z.object({
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

export const configSchema = z.object({
  whatsappNumber: z.string().regex(/^91\d{10}$/, 'Must be 91 + 10 digits'),
  operatorName: z.string().min(1),
  plans: z.array(planSchema).min(1),
});

export type Plan = z.infer<typeof planSchema>;
export type AppConfig = z.infer<typeof configSchema>;
