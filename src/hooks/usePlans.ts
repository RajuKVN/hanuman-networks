import { useQuery } from '@tanstack/react-query';

import { fetchPlans } from '@/lib/gist';
import { type UnifiedPlan } from '@/schemas/plan.schema';
import { QUERY_KEYS } from '@/utils/constants';

interface UsePlansResult {
  plans: UnifiedPlan[];
  whatsappNumber: string;
  operatorName: string;
  isLoading: boolean;
  error: Error | null;
}

export function usePlans(): UsePlansResult {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.plans,
    queryFn: fetchPlans,
  });

  return {
    plans: data?.plans ?? [],
    whatsappNumber: data?.whatsappNumber ?? '',
    operatorName: data?.operatorName ?? 'Hanuman Networks',
    isLoading,
    error: error as Error | null,
  };
}
