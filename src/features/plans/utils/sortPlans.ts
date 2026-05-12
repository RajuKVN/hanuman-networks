import { type UnifiedPlan } from '@/schemas/plan.schema';

/** Returns the default (first / monthly) price for sorting purposes. */
export function getDefaultPrice(plan: UnifiedPlan): number {
  return plan.pricing[0]?.price ?? 0;
}

function getSpeed(plan: UnifiedPlan): number {
  return plan.type === 'internet' || plan.type === 'combo' ? plan.speedMbps : 0;
}

function compareRecommended(a: UnifiedPlan, b: UnifiedPlan): number {
  if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
  if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
  return getDefaultPrice(a) - getDefaultPrice(b);
}

export type PlanSortMode =
  | 'recommended'
  | 'priceLowToHigh'
  | 'priceHighToLow'
  | 'nameAToZ'
  | 'speedHighToLow'
  | 'speedLowToHigh';

/**
 * Sort order: popular first → sortOrder ascending → default price ascending.
 */
export function sortPlans(
  plans: UnifiedPlan[],
  mode: PlanSortMode = 'recommended',
): UnifiedPlan[] {
  return [...plans].sort((a, b) => {
    switch (mode) {
      case 'priceLowToHigh': {
        const diff = getDefaultPrice(a) - getDefaultPrice(b);
        return diff !== 0 ? diff : compareRecommended(a, b);
      }
      case 'priceHighToLow': {
        const diff = getDefaultPrice(b) - getDefaultPrice(a);
        return diff !== 0 ? diff : compareRecommended(a, b);
      }
      case 'nameAToZ': {
        const diff = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        return diff !== 0 ? diff : compareRecommended(a, b);
      }
      case 'speedHighToLow': {
        const diff = getSpeed(b) - getSpeed(a);
        return diff !== 0 ? diff : compareRecommended(a, b);
      }
      case 'speedLowToHigh': {
        const diff = getSpeed(a) - getSpeed(b);
        return diff !== 0 ? diff : compareRecommended(a, b);
      }
      case 'recommended':
      default:
        return compareRecommended(a, b);
    }
  });
}
