import { Box, chakra, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '@/components/ui/LanguageToggle';

const Img = chakra('img');

interface HeaderProps {
  operatorName: string;
  whatsappNumber?: string;
}

export function Header({ operatorName, whatsappNumber }: HeaderProps): React.JSX.Element {
  const { t } = useTranslation();
  const displayName = operatorName || 'Hanuman Networks';
  const contactUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#plans';

  return (
    <Box as="header" className="site-header">
      <Flex className="header-inner" align="center" justify="space-between" gap={4}>
        <a href="#top" className="brand-lockup" aria-label={`${displayName} home`}>
          <Img src="/logo.png" alt="" className="brand-logo" />
          <Box className="brand-copy" display={{ base: 'none', sm: 'block' }}>
            <Heading as="span" className="brand-name">{displayName}</Heading>
            <Text className="brand-tagline">{t('header.tagline')}</Text>
          </Box>
        </a>
        <nav className="header-nav" aria-label={t('header.navigationLabel')}>
          <a href="#plans">{t('header.plans')}</a>
        </nav>
        <Flex align="center" gap={{ base: 2, md: 3 }}>
          <LanguageToggle />
          <a className="header-contact" href={contactUrl} target={whatsappNumber ? '_blank' : undefined} rel={whatsappNumber ? 'noreferrer' : undefined}>
            <span className="contact-dot" aria-hidden="true" />
            <span>{t('header.contact')}</span>
          </a>
        </Flex>
      </Flex>
    </Box>
  );
}
