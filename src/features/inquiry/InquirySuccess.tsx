import { Box, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
`;

export function InquirySuccess(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box
      textAlign="center"
      py={8}
      animation={`${popIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1)`}
    >
      <VStack gap={3}>
        <Text fontSize="5xl" role="img" aria-label="checkmark">
          ✅
        </Text>
        <Text fontSize="lg" fontWeight={700} color="white">
          {t('inquiry.successTitle')}
        </Text>
        <Text fontSize="sm" color="text.muted" maxW="xs" mx="auto">
          {t('inquiry.successDesc')}
        </Text>
      </VStack>
    </Box>
  );
}
