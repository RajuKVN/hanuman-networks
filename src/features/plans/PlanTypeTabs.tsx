import { Box, Flex, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type PlanTypeTab = 'ott' | 'internet' | 'combo';

interface Tab {
  id: PlanTypeTab;
  icon: string;
  labelKey: string;
  count: number;
}

interface PlanTypeTabsProps {
  active: PlanTypeTab;
  ottCount: number;
  internetCount: number;
  comboCount: number;
  onChange: (tab: PlanTypeTab) => void;
}

const tabSlide = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function PlanTypeTabs({
  active,
  ottCount,
  internetCount,
  comboCount,
  onChange,
}: PlanTypeTabsProps): React.JSX.Element {
  const { t } = useTranslation();

  const allTabs: Tab[] = [
    { id: 'ott',      icon: '📺', labelKey: 'tabs.ott',      count: ottCount      },
    { id: 'internet', icon: '⚡', labelKey: 'tabs.internet', count: internetCount },
    { id: 'combo',    icon: '🌐', labelKey: 'tabs.combo',    count: comboCount    },
  ];
  const tabs = allTabs.filter((tab) => tab.count > 0);

  if (tabs.length <= 1) return <></>;

  return (
    /* Full-width on all viewports so every tab gets equal space and nothing clips */
    <Flex
      w="full"
      gap={1.5}
      p={1.5}
      bg="glass.surface"
      border="1px solid"
      borderColor="glass.border"
      borderRadius="2xl"
      animation={`${tabSlide} 0.3s ease both`}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <Box
            as="button"
            key={tab.id}
            onClick={() => onChange(tab.id)}
            flex={1}
            px={{ base: 2, md: 4 }}
            py={{ base: 2, md: 2.5 }}
            borderRadius="xl"
            cursor="pointer"
            border="1px solid"
            transition="all 0.22s cubic-bezier(0.22,1,0.36,1)"
            bg={isActive ? 'brand.950' : 'transparent'}
            borderColor={isActive ? 'brand.600' : 'transparent'}
            _hover={
              isActive
                ? {}
                : { bg: 'whiteAlpha.100', borderColor: 'glass.border' }
            }
          >
            <Flex align="center" justify="center" gap={1.5}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                lineHeight={1}
                flexShrink={0}
              >
                {tab.icon}
              </Text>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight={isActive ? 700 : 500}
                color={isActive ? 'brand.400' : 'text.muted'}
                transition="color 0.2s ease"
                /* Clip gracefully on very narrow screens */
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {t(tab.labelKey)}
              </Text>
              <Text
                display={{ base: 'none', sm: 'block' }}
                fontSize="10px"
                fontWeight={600}
                color={isActive ? 'brand.400' : 'text.muted'}
                bg={isActive ? 'brand.950' : 'whiteAlpha.100'}
                borderRadius="full"
                px={1.5}
                py={0.5}
                lineHeight={1.4}
                minW="18px"
                textAlign="center"
                flexShrink={0}
              >
                {tab.count}
              </Text>
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
}
