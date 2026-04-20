import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { OttAvatar } from '@/components/ui/OttAvatar';
import { type Plan } from '@/schemas/plan.schema';
import { pluralise } from '@/utils/format';

/* ── OTT chip: official favicon icon + name ──────────────────────── */
function OttChip({ name }: { name: string }): React.JSX.Element {
  return (
    <Flex
      align="center"
      gap={2}
      bg="rgba(139,92,246,0.07)"
      border="1px solid rgba(139,92,246,0.18)"
      borderRadius="lg"
      px={2.5}
      py={2}
      minW="0"
    >
      <OttAvatar name={name} size={28} />
      <Text
        fontSize="xs"
        fontWeight={500}
        color="text.subtle"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        flex={1}
        minW="0"
      >
        {name}
      </Text>
    </Flex>
  );
}

/* ── Inline meta pill ─────────────────────────────────────────────── */
function MetaPill({ icon, label }: { icon: string; label: string }): React.JSX.Element {
  return (
    <Flex
      align="center"
      gap={1.5}
      bg="rgba(139,92,246,0.1)"
      border="1px solid rgba(139,92,246,0.2)"
      borderRadius="full"
      px={3}
      py={1.5}
    >
      <Text fontSize="sm">{icon}</Text>
      <Text fontSize="xs" fontWeight={500} color="text.subtle">{label}</Text>
    </Flex>
  );
}

export function PlanDetailBody({ plan }: { plan: Plan }): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <VStack align="stretch" gap={5}>
      {/* Meta pills */}
      <Flex gap={2} flexWrap="wrap">
        <MetaPill icon="📅" label={pluralise(plan.validityDays, t('common.day'), t('common.days'))} />
        {plan.tvChannels !== null && (
          <MetaPill icon="📺" label={pluralise(plan.tvChannels, t('common.channel'), t('common.channels'))} />
        )}
        {plan.speedMbps !== null && (
          <MetaPill icon="⚡" label={`${plan.speedMbps} ${t('common.mbps')}`} />
        )}
      </Flex>

      {/* OTT grid */}
      {plan.ottApps.length > 0 && (
        <Box>
          <Text
            fontSize="xs"
            fontWeight={700}
            color="brand.400"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={3}
          >
            {t('common.ottApps')} — {plan.ottCount}
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 3 }} gap={2}>
            {plan.ottApps.map((app) => (
              <OttChip key={app} name={app} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
}
