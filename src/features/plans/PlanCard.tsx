import { Badge, Box, Button, Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GlassCard } from '@/components/ui/GlassCard';
import { OttAvatar } from '@/components/ui/OttAvatar';
import { type UnifiedPlan } from '@/schemas/plan.schema';
import { OTT_PREVIEW_COUNT, TV_PREVIEW_COUNT } from '@/utils/constants';
import { formatRupees } from '@/utils/format';

const TYPE_ICONS: Record<UnifiedPlan['type'], string> = {
  ott:      '📺',
  internet: '⚡',
  combo:    '🌐',
};

interface PlanCardProps {
  plan: UnifiedPlan;
  entranceDelay?: number;
  onViewDetails: (plan: UnifiedPlan) => void;
}

function DurationChip({
  label,
  price,
  selected,
  onClick,
}: {
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <Box
      as="button"
      onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClick(); }}
      px={1.5}
      py={1}
      borderRadius="md"
      fontSize="10px"
      fontWeight={600}
      border="1px solid"
      cursor="pointer"
      transition="all 0.18s ease"
      bg={selected ? 'brand.950' : 'transparent'}
      borderColor={selected ? 'brand.500' : 'glass.border'}
      color={selected ? 'brand.400' : 'text.muted'}
      _hover={{ borderColor: 'brand.500', color: 'brand.400' }}
      textAlign="center"
      w="full"
      title={`${label} — ${formatRupees(price)}`}
    >
      {label}
    </Box>
  );
}

export function PlanCard({
  plan,
  entranceDelay = 0,
  onViewDetails,
}: PlanCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const [pricingIdx, setPricingIdx] = useState(0);

  const hasMultiPricing = plan.pricing.length > 1;
  const selectedPricing = plan.pricing[pricingIdx] ?? plan.pricing[0];
  const typeIcon        = TYPE_ICONS[plan.type];

  const ottApps     = (plan.type === 'ott' || plan.type === 'combo') ? plan.ottApps : [];
  const previewApps = ottApps.slice(0, OTT_PREVIEW_COUNT);
  const hiddenCount = ottApps.length - OTT_PREVIEW_COUNT;

  const tvChannelList    = (plan.type === 'combo' && plan.tvChannelList) ? plan.tvChannelList : [];
  const previewChannels  = tvChannelList.slice(0, TV_PREVIEW_COUNT);
  const hiddenTvCount    = tvChannelList.length - TV_PREVIEW_COUNT;

  return (
    <GlassCard isFeatured={plan.isPopular} entranceDelay={entranceDelay}>
      <VStack align="stretch" gap={3} flex={1}>

        {/* ── Name + category badge ── */}
        <Flex justify="space-between" align="flex-start" gap={2}>
          <Text fontWeight={700} fontSize="md" color="white" lineHeight="short">
            {plan.name}
          </Text>
          <Badge
            colorPalette={plan.isPopular ? 'purple' : 'gray'}
            variant="subtle"
            borderRadius="full"
            flexShrink={0}
            fontSize="xs"
          >
            {t(`plan.category.${plan.category}`)}
          </Badge>
        </Flex>

        {/* ── Type badge + popular badge ── */}
        <HStack gap={2} flexWrap="wrap">
          <Badge
            colorPalette="purple"
            variant="subtle"
            borderRadius="full"
            fontSize="10px"
            px={2}
          >
            {typeIcon} {t(`plan.type.${plan.type}`)}
          </Badge>
          {plan.isPopular && (
            <Badge colorPalette="purple" variant="solid" borderRadius="full" fontSize="xs">
              ⭐ {t('common.popular')}
            </Badge>
          )}
        </HStack>

        {/* ── Duration chips (multi-pricing only) ── */}
        {hasMultiPricing && (
          /* Grid so chips share equal width and never overflow the card */
          <SimpleGrid columns={plan.pricing.length} gap={1.5} my={1}>
            {plan.pricing.map((p, i) => (
              <DurationChip
                key={p.label}
                label={p.label}
                price={p.price}
                selected={i === pricingIdx}
                onClick={() => setPricingIdx(i)}
              />
            ))}
          </SimpleGrid>
        )}

        {/* ── Price ── */}
        <Box>
          <Text fontSize="3xl" fontWeight={800} color="brand.400" lineHeight={1}>
            {formatRupees(selectedPricing.price)}
          </Text>
          <Text fontSize="xs" color="text.muted" mt={0.5}>
            {selectedPricing.label}
          </Text>
        </Box>

        {/* ── Internet speed (internet + combo) ── */}
        {(plan.type === 'internet' || plan.type === 'combo') && (
          <Flex
            align="center"
            gap={2}
            bg="glass.surface"
            border="1px solid"
            borderColor="glass.border"
            borderRadius="lg"
            px={3}
            py={2}
          >
            <Text fontSize="sm">⚡</Text>
            <Text fontSize="sm" fontWeight={700} color="brand.400">
              {plan.speedMbps} {t('common.mbps')}
            </Text>
            <Text fontSize="xs" color="text.muted">{t('common.speed')}</Text>
          </Flex>
        )}

        {/* ── TV channels preview (combo only) ── */}
        {plan.type === 'combo' && plan.tvChannels !== null && (
          <Box>
            <Text
              fontSize="sm"
              color="text.muted"
              mb={previewChannels.length > 0 ? 2 : 0}
              fontWeight={500}
              letterSpacing="wider"
              textTransform="uppercase"
              mt={2}
            >
              📺 {t('common.tvChannels')}
            </Text>
            {previewChannels.length > 0 && (
              <>
                <SimpleGrid columns={2} gap={1}>
                  {previewChannels.map((ch) => (
                    <Flex
                      key={ch}
                      align="center"
                      gap={1.5}
                      bg="whiteAlpha.100"
                      borderRadius="md"
                      px={1.5}
                      py={1}
                      minW="0"
                      border="1px solid"
                      borderColor="glass.border"
                    >
                      <Text fontSize="10px" flexShrink={0}>📺</Text>
                      <Text
                        fontSize="xs"
                        color="text.subtle"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        flex={1}
                        minW="0"
                      >
                        {ch}
                      </Text>
                    </Flex>
                  ))}
                </SimpleGrid>
                {hiddenTvCount > 0 && (
                  <Text fontSize="xs" color="brand.400" mt={1.5} fontWeight={500}>
                    {t('common.more', { count: hiddenTvCount })}
                  </Text>
                )}
              </>
            )}
          </Box>
        )}

        {/* ── OTT apps preview (ott + combo) ── */}
        {ottApps.length > 0 && (
          <Box>
            <Text
              fontSize="sm"
              color="text.muted"
              mb={2}
              fontWeight={500}
              letterSpacing="wider"
              textTransform="uppercase"
              mt={2}
            >
              {t('common.ottApps')}
            </Text>
            <SimpleGrid columns={2} gap={1}>
              {previewApps.map((app) => (
                <Flex
                  key={app}
                  align="center"
                  gap={1.5}
                  bg="whiteAlpha.100"
                  borderRadius="md"
                  px={1.5}
                  py={1}
                  minW="0"
                  border="1px solid"
                  borderColor="glass.border"
                >
                  <OttAvatar name={app} size={18} />
                  <Text
                    fontSize="xs"
                    color="text.subtle"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    flex={1}
                    minW="0"
                  >
                    {app}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
            {hiddenCount > 0 && (
              <Text fontSize="xs" color="brand.400" mt={1.5} fontWeight={500}>
                {t('common.more', { count: hiddenCount })}
              </Text>
            )}
          </Box>
        )}

        {/* ── Plan note ── */}
        {plan.note && (
          <Text fontSize="xs" color="orange.300" fontStyle="italic">
            ⚠ {plan.note}
          </Text>
        )}

      </VStack>

      <Button
        w="full"
        mt={4}
        bg="brand.500"
        color="white"
        borderRadius="full"
        fontWeight={600}
        fontSize="sm"
        flexShrink={0}
        _hover={{ bg: 'brand.500', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(109,45,219,0.45)' }}
        _active={{ bg: 'brand.700', transform: 'translateY(0)' }}
        transition="all 0.2s cubic-bezier(0.22,1,0.36,1)"
        onClick={() => onViewDetails(plan)}
      >
        {t('common.viewDetails')}
      </Button>
    </GlassCard>
  );
}
