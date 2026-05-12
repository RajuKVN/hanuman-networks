import {
  Box,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { PlanDetailBody } from '@/features/detail/PlanDetailBody';
import { PlanDetailHeader } from '@/features/detail/PlanDetailHeader';
import { InquiryForm } from '@/features/inquiry/InquiryForm';
import { type UnifiedPlan } from '@/schemas/plan.schema';

interface PlanDetailSheetProps {
  plan: UnifiedPlan | null;
  whatsappNumber: string;
  onClose: () => void;
}

export function PlanDetailSheet({
  plan,
  whatsappNumber,
  onClose,
}: PlanDetailSheetProps): React.JSX.Element {
  const [selectedPricingIdx, setSelectedPricingIdx] = useState(0);

  /* Reset duration selection whenever a new plan is opened */
  useEffect(() => {
    setSelectedPricingIdx(0);
  }, [plan?.id]);

  const selectedPricing = plan
    ? (plan.pricing[selectedPricingIdx] ?? plan.pricing[0])
    : null;

  return (
    <DrawerRoot
      open={plan !== null}
      onOpenChange={(e) => { if (!e.open) onClose(); }}
      placement="bottom"
    >
      <DrawerBackdrop backdropFilter="blur(4px)" />

      <DrawerPositioner>
        <DrawerContent
          bg="dark.card"
          borderTop="1px solid"
          borderColor="glass.border"
          borderTopRadius="2xl"
          maxH="92dvh"
        >
          <DrawerHeader srOnly>
            <DrawerTitle>{plan?.name ?? 'Plan Details'}</DrawerTitle>
          </DrawerHeader>

          <DrawerCloseTrigger
            position="absolute"
            top={3}
            right={3}
            borderRadius="full"
            px={3}
            py={1}
            fontSize="sm"
            color="text.muted"
            bg="transparent"
            border="none"
            cursor="pointer"
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            aria-label="Close panel"
          >
            ✕
          </DrawerCloseTrigger>

          <DrawerBody
            px={{ base: 4, md: 6 }}
            pt={4}
            pb={8}
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray.400',
                borderRadius: '4px',
              },
            }}
          >
            {plan && selectedPricing && (
              <Box maxW="600px" mx="auto">
                <PlanDetailHeader
                  plan={plan}
                  selectedPricing={selectedPricing}
                  selectedPricingIdx={selectedPricingIdx}
                  onPricingChange={setSelectedPricingIdx}
                />
                <PlanDetailBody
                  plan={plan}
                  selectedPricing={selectedPricing}
                />
                <Box mt={6} pt={5} borderTop="1px solid" borderColor="glass.border">
                  <InquiryForm
                    plan={plan}
                    selectedPricing={selectedPricing}
                    whatsappNumber={whatsappNumber}
                    onSuccess={onClose}
                  />
                </Box>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </DrawerRoot>
  );
}
