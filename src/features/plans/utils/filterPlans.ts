import { type UnifiedPlan } from '@/schemas/plan.schema';

function buildSearchableText(plan: UnifiedPlan): string {
  const pricingParts = plan.pricing.flatMap((option) => [
    option.label,
    String(option.months),
    String(option.price),
    `rs ${option.price}`,
  ]);

  const baseParts: string[] = [
    plan.name,
    plan.category,
    plan.type,
    plan.note ?? '',
    ...pricingParts,
  ];

  if (plan.type === 'internet' || plan.type === 'combo') {
    baseParts.push(
      String(plan.speedMbps),
      `${plan.speedMbps} mbps`,
      `${plan.speedMbps}mbps`,
    );
  }

  if (plan.type === 'ott' || plan.type === 'combo') {
    baseParts.push(String(plan.ottCount), ...plan.ottApps);
  }

  if (plan.type === 'combo') {
    baseParts.push(String(plan.tvChannels ?? ''), ...(plan.tvChannelList ?? []));
  }

  return baseParts.join(' ').toLowerCase();
}

export function filterPlans(plans: UnifiedPlan[], query: string): UnifiedPlan[] {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) return plans;

  const tokens = trimmedQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return plans;

  return plans.filter((plan) => {
    const searchableText = buildSearchableText(plan);
    return tokens.every((token) => searchableText.includes(token));
  });
}
