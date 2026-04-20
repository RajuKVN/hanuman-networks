import { Box, chakra, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '@/components/ui/LanguageToggle';

const Img = chakra('img');

interface HeaderProps {
  operatorName: string;
}

export function Header({ operatorName }: HeaderProps): React.JSX.Element {
  const { t } = useTranslation();
  const displayName = operatorName || 'Hanuman Networks';

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(16px) saturate(1.5)"
      bg="rgba(13, 6, 24, 0.8)"
      borderBottom="1px solid"
      borderColor="glass.border"
      /* GPU compositing layer — prevents sticky-header jitter on mobile during scroll */
      transform="translateZ(0)"
      willChange="transform"
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={3}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Flex align="center" gap={3} minW={0}>
          <Img
            src="/logo.png"
            alt="Hanuman Networks logo"
            /* Mobile: logo alone carries the brand — no text needed beside it */
            h={{ base: '38px', md: '42px' }}
            w="auto"
            objectFit="contain"
            flexShrink={0}
          />
          {/* Hide brand text on mobile — the logo image already includes the name */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Heading
              as="h1"
              fontSize="xl"
              fontWeight={700}
              color="white"
              letterSpacing="-0.01em"
              whiteSpace="nowrap"
            >
              {displayName}
            </Heading>
            <Text fontSize="xs" color="text.muted" mt={0.5} whiteSpace="nowrap">
              {t('header.tagline')}
            </Text>
          </Box>
        </Flex>
        <LanguageToggle />
      </Flex>
    </Box>
  );
}
