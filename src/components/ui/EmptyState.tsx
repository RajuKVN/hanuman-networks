import { Box, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function EmptyState(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      animation={`${fadeSlideUp} 0.4s ease`}
    >
      <VStack gap={3} textAlign="center" maxW="sm" px={4}>
        <Text fontSize="4xl" role="img" aria-label="satellite dish">
          📡
        </Text>
        <Text fontSize="xl" fontWeight={600} color="white">
          {t('common.noPlans')}
        </Text>
        <Text fontSize="sm" color="text.muted">
          {t('common.noPlansDesc')}
        </Text>
      </VStack>
    </Box>
  );
}
