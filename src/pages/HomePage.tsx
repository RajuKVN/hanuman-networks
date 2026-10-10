import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PlanGrid } from '@/features/plans/PlanGrid';
import { usePlans } from '@/hooks/usePlans';
import { QUERY_KEYS } from '@/utils/constants';

export function HomePage(): React.JSX.Element {
  const { plans, whatsappNumber, isLoading, error } = usePlans();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  function handleRetry(): void {
    void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.plans });
  }

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={handleRetry} />;
  if (plans.length === 0) return <><section className="catalogue-empty-intro"><p className="eyebrow">{t('home.emptyEyebrow')}</p><h2>{t('home.emptyTitle')}</h2><p>{t('home.emptyDescription')}</p></section><EmptyState /></>;

  return <PlanGrid plans={plans} whatsappNumber={whatsappNumber} />;
}
