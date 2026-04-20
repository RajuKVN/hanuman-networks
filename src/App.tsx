import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { AppShell } from '@/components/layout/AppShell';
import { queryClient } from '@/config/queryClient';
import { HomePage } from '@/pages/HomePage';

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <HomePage />
      </AppShell>
    </QueryClientProvider>
  );
}
