import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { InquirySuccess } from '@/features/inquiry/InquirySuccess';
import { buildMessage } from '@/features/inquiry/utils/buildMessage';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { type Plan } from '@/schemas/plan.schema';
import { INQUIRY_SUCCESS_CLOSE_DELAY_MS } from '@/utils/constants';

interface InquiryFormProps {
  plan: Plan;
  whatsappNumber: string;
  onSuccess: () => void;
}

const inquirySchema = z.object({
  name: z.string().min(1, 'errorName'),
  mobile: z.string().regex(/^\d{10}$/, 'errorMobile'),
  area: z.string().min(1, 'errorArea'),
});

type InquiryFields = z.infer<typeof inquirySchema>;

export function InquiryForm({ plan, whatsappNumber, onSuccess }: InquiryFormProps): React.JSX.Element {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InquiryFields>({
    resolver: zodResolver(inquirySchema),
  });

  function onSubmit(data: InquiryFields): void {
    const message = buildMessage(plan, data);
    const url = buildWhatsAppUrl(whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(onSuccess, INQUIRY_SUCCESS_CLOSE_DELAY_MS);
  }

  if (submitted) return <InquirySuccess />;

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="lg" fontWeight={700} color="white" mb={4}>
        {t('inquiry.title')}
      </Text>
      <VStack gap={4} align="stretch">
        <Box>
          <Text fontSize="sm" color="text.subtle" mb={1}>{t('inquiry.name')}</Text>
          <Input
            {...register('name')}
            placeholder={t('inquiry.namePlaceholder')}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.name ? 'red.400' : 'glass.border'}
            color="white"
            borderRadius="lg"
            _placeholder={{ color: 'text.muted' }}
            _focus={{ borderColor: 'brand.500', outline: 'none' }}
          />
          {errors.name && (
            <Text fontSize="xs" color="red.400" mt={1}>{t(`inquiry.${errors.name.message}`)}</Text>
          )}
        </Box>
        <Box>
          <Text fontSize="sm" color="text.subtle" mb={1}>{t('inquiry.mobile')}</Text>
          <Input
            {...register('mobile')}
            placeholder={t('inquiry.mobilePlaceholder')}
            inputMode="numeric"
            maxLength={10}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.mobile ? 'red.400' : 'glass.border'}
            color="white"
            borderRadius="lg"
            _placeholder={{ color: 'text.muted' }}
            _focus={{ borderColor: 'brand.500', outline: 'none' }}
          />
          {errors.mobile && (
            <Text fontSize="xs" color="red.400" mt={1}>{t(`inquiry.${errors.mobile.message}`)}</Text>
          )}
        </Box>
        <Box>
          <Text fontSize="sm" color="text.subtle" mb={1}>{t('inquiry.area')}</Text>
          <Input
            {...register('area')}
            placeholder={t('inquiry.areaPlaceholder')}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.area ? 'red.400' : 'glass.border'}
            color="white"
            borderRadius="lg"
            _placeholder={{ color: 'text.muted' }}
            _focus={{ borderColor: 'brand.500', outline: 'none' }}
          />
          {errors.area && (
            <Text fontSize="xs" color="red.400" mt={1}>{t(`inquiry.${errors.area.message}`)}</Text>
          )}
        </Box>
        <Button
          type="submit"
          loading={isSubmitting}
          loadingText={t('inquiry.submitting')}
          w="full"
          bg="green.600"
          color="white"
          borderRadius="full"
          fontWeight={600}
          _hover={{ bg: 'green.500' }}
          _active={{ bg: 'green.700' }}
        >
          📲 {t('inquiry.submit')}
        </Button>
      </VStack>
    </Box>
  );
}
