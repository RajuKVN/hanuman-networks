import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { OttAvatar } from '@/components/ui/OttAvatar';
import { type PricingOption, type UnifiedPlan } from '@/schemas/plan.schema';

/* ── TV channel chip ──────────────────────────────────────────────── */
function ChannelChip({ name }: { name: string }): React.JSX.Element {
  return (
    <Flex
      align="center"
      gap={2}
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="glass.border"
      borderRadius="lg"
      px={2.5}
      py={2}
      minW="0"
    >
      <Text fontSize="sm" flexShrink={0}>📺</Text>
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

/* ── OTT chip ─────────────────────────────────────────────────────── */
function OttChip({ name }: { name: string }): React.JSX.Element {
  return (
    <Flex
      align="center"
      gap={2}
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="glass.border"
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

/* ── Meta pill ────────────────────────────────────────────────────── */
function MetaPill({ icon, label }: { icon: string; label: string }): React.JSX.Element {
  return (
    <Flex
      align="center"
      gap={1.5}
      bg="glass.surface"
      border="1px solid"
      borderColor="glass.border"
      borderRadius="full"
      px={3}
      py={1.5}
    >
      <Text fontSize="sm">{icon}</Text>
      <Text fontSize="xs" fontWeight={500} color="text.subtle">{label}</Text>
    </Flex>
  );
}

interface PlanDetailBodyProps {
  plan: UnifiedPlan;
  selectedPricing: PricingOption;
}

export function PlanDetailBody({ plan, selectedPricing }: PlanDetailBodyProps): React.JSX.Element {
  const { t } = useTranslation();

  const isInternet = plan.type === 'internet' || plan.type === 'combo';
  const hasOtt     = plan.type === 'ott' || plan.type === 'combo';

  return (
    <VStack align="stretch" gap={5}>

      {/* ── Meta pills ── */}
      <Flex gap={2} flexWrap="wrap">
        <MetaPill icon="📅" label={selectedPricing.label} />
        {isInternet && (
          <MetaPill
            icon="⚡"
            label={`${(plan as { speedMbps: number }).speedMbps} ${t('common.mbps')}`}
          />
        )}
        {plan.type === 'combo' && plan.tvChannels !== null && (
          <MetaPill icon="📺" label={`${plan.tvChannels}+ ${t('common.tvChannels')}`} />
        )}
      </Flex>

      {/* ── Speed highlight box (internet + combo) ── */}
      {isInternet && (
        <Box
          p={4}
          bg="glass.surface"
          border="1px solid"
          borderColor="glass.border"
          borderRadius="xl"
        >
          <Text
            fontSize="xs"
            fontWeight={600}
            color="brand.400"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={1}
          >
            {t('common.speed')}
          </Text>
          <Text fontSize="4xl" fontWeight={900} color="brand.400" lineHeight={1}>
            {(plan as { speedMbps: number }).speedMbps}
            <Text as="span" fontSize="lg" fontWeight={500} ml={1} color="text.subtle">
              Mbps
            </Text>
          </Text>
          {plan.type === 'internet' && (
            <Text fontSize="xs" color="text.muted" mt={1}>
              Unlimited data · FUP may apply
            </Text>
          )}
        </Box>
      )}

      {/* ── TV channels grid (combo only) ── */}
      {plan.type === 'combo' && plan.tvChannelList && plan.tvChannelList.length > 0 && (
        <Box>
          <Text
            fontSize="xs"
            fontWeight={700}
            color="brand.400"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={3}
          >
            {t('common.tvChannelList')} — {plan.tvChannels}+
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 3 }} gap={2}>
            {plan.tvChannelList.map((ch) => (
              <ChannelChip key={ch} name={ch} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* ── OTT apps grid ── */}
      {hasOtt && (plan.type === 'ott' || plan.type === 'combo') && plan.ottApps.length > 0 && (
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

      {/* ── Plan note ── */}
      {plan.note && (
        <Flex
          gap={2}
          p={3}
          bg="orange.950"
          border="1px solid"
          borderColor="orange.800"
          borderRadius="lg"
          align="flex-start"
        >
          <Text fontSize="sm" flexShrink={0}>⚠️</Text>
          <Text fontSize="xs" color="orange.300" fontStyle="italic">{plan.note}</Text>
        </Flex>
      )}

    </VStack>
  );
}
