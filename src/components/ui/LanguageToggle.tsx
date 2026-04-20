import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguage } from '@/hooks/useLanguage';

export function LanguageToggle(): React.JSX.Element {
  const { t } = useTranslation();
  const { lang, setLang } = useLanguage();

  return (
    <HStack gap={1} bg="whiteAlpha.100" borderRadius="full" p={1}>
      <Button
        size="xs"
        borderRadius="full"
        variant={lang === 'en' ? 'solid' : 'ghost'}
        bg={lang === 'en' ? 'brand.700' : 'transparent'}
        color="white"
        fontWeight={lang === 'en' ? 600 : 400}
        px={3}
        py={1}
        minW="auto"
        h="auto"
        fontSize="xs"
        onClick={() => setLang('en')}
        _hover={{ bg: lang === 'en' ? 'brand.600' : 'whiteAlpha.200' }}
        aria-label="Switch to English"
      >
        {t('lang.en')}
      </Button>
      <Button
        size="xs"
        borderRadius="full"
        variant={lang === 'te' ? 'solid' : 'ghost'}
        bg={lang === 'te' ? 'brand.700' : 'transparent'}
        color="white"
        fontWeight={lang === 'te' ? 600 : 400}
        px={3}
        py={1}
        minW="auto"
        h="auto"
        fontSize="xs"
        onClick={() => setLang('te')}
        _hover={{ bg: lang === 'te' ? 'brand.600' : 'whiteAlpha.200' }}
        aria-label="Switch to Telugu"
      >
        {t('lang.te')}
      </Button>
    </HStack>
  );
}
