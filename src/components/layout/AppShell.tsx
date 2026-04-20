import { Box } from '@chakra-ui/react';
import React from 'react';

import { Header } from '@/components/layout/Header';
import { usePlans } from '@/hooks/usePlans';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps): React.JSX.Element {
  // TanStack Query deduplicates this — no extra fetch vs the one in HomePage.
  const { operatorName } = usePlans();

  return (
    <Box
      minH="100vh"
      /* Multi-layer aurora: top-left violet bloom + bottom-right indigo bloom + center haze */
      backgroundImage={[
        'radial-gradient(ellipse 70% 55% at 15% -5%,  rgba(109,45,219,0.30) 0%, transparent 65%)',
        'radial-gradient(ellipse 55% 45% at 88% 105%, rgba(88,28,135,0.22) 0%, transparent 60%)',
        'radial-gradient(ellipse 40% 35% at 50% 55%,  rgba(30,10,92,0.18)  0%, transparent 70%)',
      ].join(', ')}
      backgroundAttachment="fixed"
    >
      <Header operatorName={operatorName} />
      <Box
        as="main"
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 6, md: 8 }}
      >
        {children}
      </Box>
    </Box>
  );
}
