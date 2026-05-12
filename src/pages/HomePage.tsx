import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PlanGrid } from '@/features/plans/PlanGrid';
import { usePlans } from '@/hooks/usePlans';
import { QUERY_KEYS } from '@/utils/constants';

export function HomePage(): React.JSX.Element {
  const { plans, whatsappNumber, isLoading, error } = usePlans();
  const queryClient = useQueryClient();

  function handleRetry(): void {
    void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.plans });
  }

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={handleRetry} />;
  if (plans.length === 0) return <EmptyState />;

  return <PlanGrid plans={plans} whatsappNumber={whatsappNumber} />;
}
