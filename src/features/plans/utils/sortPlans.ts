import { type Plan } from '@/schemas/plan.schema';

/**
 * Sort order: popular first → sortOrder ascending → price ascending.
 */
export function sortPlans(plans: Plan[]): Plan[] {
  return [...plans].sort((a, b) => {
    if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.price - b.price;
  });
}
