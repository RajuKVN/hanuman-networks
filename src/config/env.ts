import { z } from 'zod';

const envSchema = z.object({
  VITE_GIST_URL: z
    .string()
    .url('VITE_GIST_URL must be a valid URL')
    .startsWith('https://', 'VITE_GIST_URL must use HTTPS'),
});

const parsed = envSchema.safeParse({
  VITE_GIST_URL: import.meta.env.VITE_GIST_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  • ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(`Environment validation failed:\n${issues}`);
}

export const env = parsed.data;
