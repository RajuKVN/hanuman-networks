import { Badge, Box, Button, Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { GlassCard } from '@/components/ui/GlassCard';
import { OttAvatar } from '@/components/ui/OttAvatar';
import { type Plan } from '@/schemas/plan.schema';
import { OTT_PREVIEW_COUNT } from '@/utils/constants';
import { formatRupees, pluralise } from '@/utils/format';

interface PlanCardProps {
  plan: Plan;
  entranceDelay?: number;
  onViewDetails: (plan: Plan) => void;
}

export function PlanCard({
  plan,
  entranceDelay = 0,
  onViewDetails,
}: PlanCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const visibleOtt = plan.ottApps.slice(0, OTT_PREVIEW_COUNT);
  const hiddenCount = plan.ottApps.length - OTT_PREVIEW_COUNT;

  return (
    /* GlassCard is display:flex flex-col h:full so the button always sits at the bottom */
    <GlassCard isFeatured={plan.isPopular} entranceDelay={entranceDelay}>
      {/* flex:1 makes this section grow, pushing the button down */}
      <VStack align="stretch" gap={3} flex={1}>
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

        {plan.isPopular && (
          <Badge colorPalette="purple" variant="solid" borderRadius="full" alignSelf="flex-start" fontSize="xs">
            ⭐ {t('common.popular')}
          </Badge>
        )}

        <Box>
          <Text fontSize="3xl" fontWeight={800} color="brand.400" lineHeight={1}>
            {formatRupees(plan.price)}
          </Text>
          <Text fontSize="xs" color="text.muted" mt={1}>
            {pluralise(plan.validityDays, t('common.day'), t('common.days'))} {t('plan.validity').toLowerCase()}
          </Text>
        </Box>

        {plan.ottApps.length > 0 && (
          <Box>
            <Text fontSize="xs" color="text.muted" mb={2} fontWeight={500} letterSpacing="wider" textTransform="uppercase">
              {t('common.ottApps')}
            </Text>
            <SimpleGrid columns={2} gap={1}>
              {visibleOtt.map((app) => (
                <Flex
                  key={app}
                  align="center"
                  gap={1.5}
                  bg="rgba(139,92,246,0.10)"
                  borderRadius="md"
                  px={1.5}
                  py={1}
                  minW="0"
                  border="1px solid rgba(167,139,250,0.15)"
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

        {plan.tvChannels !== null && (
          <HStack gap={2}>
            <Text fontSize="xs" color="text.muted">
              📺 {pluralise(plan.tvChannels, t('common.channel'), t('common.channels'))}
            </Text>
          </HStack>
        )}
      </VStack>

      {/* Always at the bottom regardless of card content height */}
      <Button
        w="full"
        mt={4}
        bg="brand.600"
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
