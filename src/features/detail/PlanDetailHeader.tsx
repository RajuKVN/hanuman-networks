import { Badge, Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { type PricingOption, type UnifiedPlan } from '@/schemas/plan.schema';
import { formatRupees } from '@/utils/format';

interface PlanDetailHeaderProps {
  plan: UnifiedPlan;
  selectedPricing: PricingOption;
  selectedPricingIdx: number;
  onPricingChange: (idx: number) => void;
}

const TYPE_ICONS: Record<UnifiedPlan['type'], string> = {
  ott:      '📺',
  internet: '⚡',
  combo:    '🌐',
};

export function PlanDetailHeader({
  plan,
  selectedPricing,
  selectedPricingIdx,
  onPricingChange,
}: PlanDetailHeaderProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box mb={5}>
      {/* ── Badges ── */}
      <HStack gap={2} mb={3} flexWrap="wrap">
        <Badge
          colorPalette="purple"
          variant="subtle"
          borderRadius="full"
          fontSize="xs"
          px={2}
        >
          {TYPE_ICONS[plan.type]} {t(`plan.type.${plan.type}`)}
        </Badge>
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

      {/* ── Name (full width) ── */}
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight={800}
        color="white"
        lineHeight="tight"
        letterSpacing="-0.02em"
        mb={1}
      >
        {plan.name}
      </Text>

      {/* ── Price (own row) ── */}
      <Flex align="baseline" gap={2}>
        <Text
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight={900}
          color="brand.400"
          lineHeight={1}
          letterSpacing="-0.03em"
        >
          {formatRupees(selectedPricing.price)}
        </Text>
        <Text fontSize="sm" color="text.muted">
          · {selectedPricing.label}
        </Text>
      </Flex>

      {/* ── Duration selector (multi-pricing) ── */}
      {plan.pricing.length > 1 && (
        <SimpleGrid
          columns={{ base: 2, sm: 4 }}
          gap={2}
          mt={4}
        >
          {plan.pricing.map((p, i) => {
            const isActive = i === selectedPricingIdx;
            return (
              <Box
                as="button"
                key={p.label}
                onClick={() => onPricingChange(i)}
                w="full"
                px={2}
                py={2}
                borderRadius="lg"
                cursor="pointer"
                border="1px solid"
                textAlign="center"
                transition="all 0.18s ease"
                bg={isActive ? 'brand.950' : 'transparent'}
                borderColor={isActive ? 'brand.500' : 'glass.border'}
                _hover={{ borderColor: 'brand.500' }}
              >
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? 700 : 500}
                  color={isActive ? 'brand.400' : 'text.muted'}
                  whiteSpace="nowrap"
                >
                  {p.label}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight={700}
                  color={isActive ? 'white' : 'text.subtle'}
                  mt={0.5}
                >
                  {formatRupees(p.price)}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      {/* ── Divider ── */}
      <Box
        mt={4}
        h="1px"
        bg="linear-gradient(90deg, {colors.brand.600} 0%, transparent 100%)"
      />
    </Box>
  );
}
