import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlanCard } from '@/features/plans/PlanCard';
import { sortPlans } from '@/features/plans/utils/sortPlans';
import { type Plan } from '@/schemas/plan.schema';

import { PlanDetailSheet } from '@/features/detail/PlanDetailSheet';

interface PlanGridProps {
  plans: Plan[];
  whatsappNumber: string;
}

/** ↓ STAGGER: milliseconds between each card appearing. Lower = faster cascade. */
const CARD_STAGGER_MS = 15;

export function PlanGrid({ plans, whatsappNumber }: PlanGridProps): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const sorted = sortPlans(plans);

  return (
    <>
      <VStack align="stretch" gap={6}>
        <Box>
          <Text
            as="h2"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={700}
            color="white"
            letterSpacing="-0.02em"
          >
            {t('home.title')}
          </Text>
          <Text fontSize="sm" color="text.muted" mt={1}>
            {t('home.subtitle')}
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={{ base: 4, md: 5 }}
        >
          {sorted.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              entranceDelay={index * CARD_STAGGER_MS}
              onViewDetails={setSelectedPlan}
            />
          ))}
        </SimpleGrid>
      </VStack>

      <PlanDetailSheet
        plan={selectedPlan}
        whatsappNumber={whatsappNumber}
        onClose={() => setSelectedPlan(null)}
      />
    </>
  );
}
