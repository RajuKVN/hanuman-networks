import { env } from '@/config/env';
import { configSchema, type AppConfig } from '@/schemas/plan.schema';

export class GistFetchError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'GistFetchError';
  }
}

export async function fetchPlans(): Promise<AppConfig> {
  let response: Response;

  try {
    response = await fetch(env.VITE_GIST_URL, {
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    });
  } catch (err) {
    throw new GistFetchError('Network error fetching plans', err);
  }

  if (!response.ok) {
    throw new GistFetchError(`Gist responded with status ${response.status}`);
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch (err) {
    throw new GistFetchError('Invalid JSON in Gist response', err);
  }

  const result = configSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map((i) => i.message).join('; ');
    throw new GistFetchError(`Gist data validation failed: ${issues}`);
  }

  return result.data;
}
