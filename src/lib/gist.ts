import { env } from '@/config/env';
import {
  configSchema,
  type AppConfigNormalized,
  type LegacyPlan,
  type UnifiedPlan,
} from '@/schemas/plan.schema';

export class GistFetchError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'GistFetchError';
  }
}

/** Converts an old flat-format plan to a unified OTT plan shape. */
function normalizeLegacy(p: LegacyPlan): UnifiedPlan {
  return {
    type: 'ott',
    id: p.id,
    name: p.name,
    category: p.category,
    isPopular: p.isPopular,
    sortOrder: p.sortOrder,
    ottCount: p.ottCount,
    ottApps: p.ottApps,
    pricing: [{ label: 'Monthly', months: 1, price: p.price }],
  };
}

export async function fetchPlans(): Promise<AppConfigNormalized> {
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

  const { whatsappNumber, operatorName, ottPlans, internetPlans, comboPlans, plans: legacy } = result.data;

  const allPlans: UnifiedPlan[] = [
    ...(ottPlans ?? []),
    ...(internetPlans ?? []),
    ...(comboPlans ?? []),
    ...(legacy?.map(normalizeLegacy) ?? []),
  ];

  return { whatsappNumber, operatorName, plans: allPlans };
}
