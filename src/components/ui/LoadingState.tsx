import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export function LoadingState(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      animation={`${fadeIn} 0.3s ease`}
    >
      <VStack gap={4}>
        <Spinner size="xl" color="brand.400" borderWidth="3px" />
        <Text color="text.muted" fontSize="sm">
          {t('common.loading')}
        </Text>
      </VStack>
    </Box>
  );
}
