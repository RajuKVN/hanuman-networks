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
import React from 'react';

import { PlanDetailBody } from '@/features/detail/PlanDetailBody';
import { PlanDetailHeader } from '@/features/detail/PlanDetailHeader';
import { InquiryForm } from '@/features/inquiry/InquiryForm';
import { type Plan } from '@/schemas/plan.schema';

interface PlanDetailSheetProps {
  plan: Plan | null;
  whatsappNumber: string;
  onClose: () => void;
}

export function PlanDetailSheet({
  plan,
  whatsappNumber,
  onClose,
}: PlanDetailSheetProps): React.JSX.Element {
  return (
    <DrawerRoot
      open={plan !== null}
      onOpenChange={(e) => { if (!e.open) onClose(); }}
      placement="bottom"
    >
      <DrawerBackdrop backdropFilter="blur(4px)" />

      {/* DrawerPositioner is required in Chakra v3 — it handles the CSS positioning */}
      <DrawerPositioner>
        <DrawerContent
          bg="dark.card"
          borderTop="1px solid"
          borderColor="glass.border"
          borderTopRadius="2xl"
          maxH="92dvh"
        >
          {/* Visually hidden title satisfies a11y without duplicating the plan name */}
          <DrawerHeader srOnly>
            <DrawerTitle>{plan?.name ?? 'Plan Details'}</DrawerTitle>
          </DrawerHeader>

          {/* Close button — DrawerCloseTrigger is already a <button>, no asChild needed */}
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
                background: 'rgba(124,58,237,0.4)',
                borderRadius: '4px',
              },
            }}
          >
            {plan && (
              <Box maxW="600px" mx="auto">
                <PlanDetailHeader plan={plan} />
                <PlanDetailBody plan={plan} />
                <Box mt={6} pt={5} borderTop="1px solid" borderColor="glass.border">
                  <InquiryForm
                    plan={plan}
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
