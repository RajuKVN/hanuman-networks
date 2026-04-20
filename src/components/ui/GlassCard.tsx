import { Box, type BoxProps } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React from 'react';

const entrance = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 1px rgba(139,92,246,0.45), 0 0 28px rgba(109,45,219,0.20), 0 8px 32px rgba(5,0,15,0.5); }
  50%       { box-shadow: 0 0 0 1px rgba(167,139,250,0.65), 0 0 48px rgba(109,45,219,0.38), 0 8px 32px rgba(5,0,15,0.5); }
`;

/* Light-streak that sweeps left→right every 4 s */
const shimmer = keyframes`
  0%        { transform: translateX(-160%) skewX(-20deg); }
  55%, 100% { transform: translateX(260%)  skewX(-20deg); }
`;

interface GlassCardProps extends BoxProps {
  isFeatured?: boolean;
  entranceDelay?: number;
}

export function GlassCard({
  isFeatured = false,
  entranceDelay = 0,
  children,
  ...rest
}: GlassCardProps): React.JSX.Element {
  /* ↓ ANIMATION DURATION: change 0.38s to slow down / speed up the card entrance */
  const enterAnim  = `${entrance} 0.38s cubic-bezier(0.22, 1, 0.36, 1) ${entranceDelay}ms both`;
  const featAnim   = `${enterAnim}, ${glowPulse} 4s ease-in-out ${entranceDelay + 200}ms infinite`;
  const shimmerAnim = `${shimmer} 4.5s ease-in-out ${entranceDelay + 400}ms infinite`;

  return (
    <Box
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      h="full"
      borderRadius="2xl"
      /* Real glass: semi-transparent + strong blur so bg aurora bleeds through */
      bg="rgba(10, 2, 30, 0.52)"
      backdropFilter="blur(22px) saturate(2) brightness(1.08)"
      border="1px solid"
      borderColor={isFeatured ? 'rgba(167,139,250,0.55)' : 'rgba(139,92,246,0.22)'}
      boxShadow={
        isFeatured
          ? 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(109,45,219,0.35), 0 12px 40px rgba(5,0,15,0.55)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(5,0,15,0.45)'
      }
      p={{ base: 4, md: 5 }}
      transition="transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease"
      animation={isFeatured ? featAnim : enterAnim}
      _hover={{
        transform: 'translateY(-5px) scale(1.015)',
        borderColor: isFeatured ? 'rgba(196,181,253,0.65)' : 'rgba(167,139,250,0.42)',
        boxShadow: isFeatured
          ? 'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(167,139,250,0.5), 0 20px 60px rgba(88,28,135,0.45)'
          : 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(88,28,135,0.30)',
      }}
      css={{
        /* Diagonal shimmer streak */
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, transparent 38%, rgba(196,181,253,0.07) 50%, transparent 62%)',
          animation: shimmerAnim,
          pointerEvents: 'none',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&::after': { animation: 'none' },
        },
        /* Featured: subtle violet inner gradient */
        ...(isFeatured && {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(145deg, rgba(139,92,246,0.12) 0%, transparent 50%, rgba(88,28,135,0.08) 100%)',
            pointerEvents: 'none',
          },
        }),
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
