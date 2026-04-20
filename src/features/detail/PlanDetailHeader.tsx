import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { type Plan } from '@/schemas/plan.schema';
import { formatRupees } from '@/utils/format';

interface PlanDetailHeaderProps {
  plan: Plan;
}

export function PlanDetailHeader({ plan }: PlanDetailHeaderProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box mb={5}>
      {/* Badges row */}
      <HStack gap={2} mb={2} flexWrap="wrap">
        <Badge
          colorPalette={plan.isPopular ? 'purple' : 'gray'}
          variant="subtle"
          borderRadius="full"
          fontSize="xs"
          px={2}
        >
          {t(`plan.category.${plan.category}`)}
        </Badge>
        {plan.isPopular && (
          <Badge colorPalette="purple" variant="solid" borderRadius="full" fontSize="xs" px={2}>
            ⭐ {t('common.popular')}
          </Badge>
        )}
      </HStack>

      {/* Name + Price row */}
      <Flex justify="space-between" align="flex-end" gap={4} flexWrap="wrap">
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight={800}
          color="white"
          lineHeight="tight"
          letterSpacing="-0.02em"
          flex={1}
        >
          {plan.name}
        </Text>

        <Box textAlign="right" flexShrink={0}>
          <Text fontSize="3xl" fontWeight={900} color="brand.400" lineHeight={1} letterSpacing="-0.03em">
            {formatRupees(plan.price)}
          </Text>
          <Text fontSize="xs" color="text.muted" mt={0.5}>
            / month · {plan.validityDays} days
          </Text>
        </Box>
      </Flex>

      <Box mt={4} h="1px" bg="linear-gradient(90deg, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0.05) 100%)" />
    </Box>
  );
}
