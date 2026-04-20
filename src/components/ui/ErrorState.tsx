import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
    >
      <VStack gap={4} textAlign="center" maxW="sm" px={4}>
        <Text fontSize="4xl" role="img" aria-label="warning">
          ⚠️
        </Text>
        <Text fontSize="xl" fontWeight={600} color="white">
          {t('common.error')}
        </Text>
        {onRetry && (
          <Button
            onClick={onRetry}
            bg="brand.700"
            color="white"
            borderRadius="full"
            _hover={{ bg: 'brand.600' }}
            px={6}
          >
            {t('common.retry')}
          </Button>
        )}
      </VStack>
    </Box>
  );
}
