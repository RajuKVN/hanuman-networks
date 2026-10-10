import { Box, Flex, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlanDetailSheet } from '@/features/detail/PlanDetailSheet';
import { PlanCard } from '@/features/plans/PlanCard';
import { PlanTypeTabs, type PlanTypeTab } from '@/features/plans/PlanTypeTabs';
import { filterPlans } from '@/features/plans/utils/filterPlans';
import { sortPlans, type PlanSortMode } from '@/features/plans/utils/sortPlans';
import { type UnifiedPlan } from '@/schemas/plan.schema';

interface PlanGridProps {
  plans: UnifiedPlan[];
  whatsappNumber: string;
}

const CARD_STAGGER_MS = 15;

const gridFade = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const dropdownFade = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const SORT_ICONS: Record<PlanSortMode, string> = {
  recommended:    '⭐',
  priceLowToHigh: '₹↑',
  priceHighToLow: '₹↓',
  nameAToZ:       'Az',
  speedHighToLow: '⚡↓',
  speedLowToHigh: '⚡↑',
};

/* ─── SVG icon helpers ─── */
function IconSearch(): React.JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconX(): React.JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconChevronDown(): React.JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconCheck(): React.JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Sort dropdown ─── */
interface SortDropdownProps {
  value: PlanSortMode;
  options: Array<{ value: PlanSortMode; label: string }>;
  onChange: (mode: PlanSortMode) => void;
}

function SortDropdown({ value, options, onChange }: SortDropdownProps): React.JSX.Element {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel = options.find((o) => o.value === value)?.label ?? '';

  useEffect(() => {
    if (!isOpen) return;
    function onOutsideClick(e: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

  return (
    <Box position="relative" ref={containerRef} flexShrink={0}>
      {/* Trigger */}
      <Box
        as="button"
        onClick={() => setIsOpen((v) => !v)}
        display="flex"
        alignItems="center"
        gap={2}
        px={3}
        h="40px"
        w={{ base: 'full', md: 'auto' }}
        minW={{ md: '215px' }}
        bg={isOpen ? 'rgba(109,45,219,0.12)' : 'rgba(255,255,255,0.06)'}
        border="1px solid"
        borderColor={isOpen ? 'brand.500' : 'glass.border'}
        borderRadius="xl"
        color="white"
        cursor="pointer"
        transition="all 0.18s ease"
        _hover={{ borderColor: 'brand.400', bg: 'rgba(109,45,219,0.1)' }}
        userSelect="none"
      >
        <Text fontSize="xs" color="text.muted" flexShrink={0} mr={0.5}>
          {t('home.sortBy')}
        </Text>
        <Text fontSize="xs" mr={0.5} flexShrink={0}>{SORT_ICONS[value]}</Text>
        <Text fontSize="sm" fontWeight={500} flex={1} textAlign="left" color="white" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {currentLabel}
        </Text>
        <Box
          color="text.muted"
          display="flex"
          alignItems="center"
          transition="transform 0.2s ease"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          flexShrink={0}
        >
          <IconChevronDown />
        </Box>
      </Box>

      {/* Panel */}
      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 6px)"
          right={0}
          zIndex={200}
          bg="rgba(8, 2, 24, 0.96)"
          backdropFilter="blur(24px)"
          border="1px solid"
          borderColor="glass.border"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)"
          minW="215px"
          py={1.5}
          animation={`${dropdownFade} 0.18s cubic-bezier(0.22,1,0.36,1) both`}
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <Box
                as="button"
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                display="flex"
                alignItems="center"
                gap={2.5}
                w="full"
                px={3.5}
                py={2}
                textAlign="left"
                cursor="pointer"
                bg={isActive ? 'rgba(109,45,219,0.22)' : 'transparent'}
                _hover={{ bg: isActive ? 'rgba(109,45,219,0.28)' : 'rgba(255,255,255,0.07)' }}
                transition="background 0.12s ease"
              >
                <Text fontSize="xs" flexShrink={0} w={5} textAlign="center">{SORT_ICONS[option.value]}</Text>
                <Text
                  fontSize="sm"
                  fontWeight={isActive ? 600 : 400}
                  color={isActive ? 'brand.300' : 'text.muted'}
                  flex={1}
                >
                  {option.label}
                </Text>
                {isActive && (
                  <Box color="brand.400" display="flex" alignItems="center" flexShrink={0}>
                    <IconCheck />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

/* ─── Main component ─── */
export function PlanGrid({ plans, whatsappNumber }: PlanGridProps): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<UnifiedPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<PlanSortMode>('recommended');

  const ottPlans      = plans.filter((p) => p.type === 'ott');
  const internetPlans = plans.filter((p) => p.type === 'internet');
  const comboPlans    = plans.filter((p) => p.type === 'combo');

  const defaultTab: PlanTypeTab =
    ottPlans.length > 0 ? 'ott' :
    comboPlans.length > 0 ? 'combo' :
    'internet';

  const [activeTab, setActiveTab] = useState<PlanTypeTab>(defaultTab);

  const activeTabPlans = useMemo(
    () => (activeTab === 'ott'
      ? ottPlans
      : activeTab === 'internet'
        ? internetPlans
        : comboPlans),
    [activeTab, comboPlans, internetPlans, ottPlans],
  );

  const visiblePlans = useMemo(() => {
    const filteredPlans = filterPlans(activeTabPlans, searchQuery);
    return sortPlans(filteredPlans, sortMode);
  }, [activeTabPlans, searchQuery, sortMode]);

  const sortOptions = useMemo(() => {
    const options: Array<{ value: PlanSortMode; label: string }> = [
      { value: 'recommended',    label: t('home.sort.recommended') },
      { value: 'priceLowToHigh', label: t('home.sort.priceLowToHigh') },
      { value: 'priceHighToLow', label: t('home.sort.priceHighToLow') },
      { value: 'nameAToZ',       label: t('home.sort.nameAToZ') },
    ];
    if (activeTab === 'internet' || activeTab === 'combo') {
      options.push(
        { value: 'speedHighToLow', label: t('home.sort.speedHighToLow') },
        { value: 'speedLowToHigh', label: t('home.sort.speedLowToHigh') },
      );
    }
    return options;
  }, [activeTab, t]);

  useEffect(() => {
    const speedSortSelected = sortMode === 'speedHighToLow' || sortMode === 'speedLowToHigh';
    const speedSortAllowed  = activeTab === 'internet' || activeTab === 'combo';
    if (speedSortSelected && !speedSortAllowed) setSortMode('recommended');
  }, [activeTab, sortMode]);

  function handleTabChange(tab: PlanTypeTab): void {
    setActiveTab(tab);
    setSelectedPlan(null);
    setSearchQuery('');
  }

  const isFiltered      = searchQuery.trim().length > 0;
  const totalCount      = activeTabPlans.length;
  const visibleCount    = visiblePlans.length;

  return (
    <>
      <VStack align="stretch" gap={6} className="catalogue-section">
        {/* Heading */}
        <Box className="catalogue-heading">
          <Text
            as="h2"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={700}
            color="white"
            letterSpacing="-0.02em"
          >
            {t('home.title')}
          </Text>
          <Text fontSize="sm" color="text.muted" mt={1}>
            {t('home.subtitle')}
          </Text>
        </Box>

        {/* Tab switcher */}
        <Box w="full">
          <PlanTypeTabs
            active={activeTab}
            ottCount={ottPlans.length}
            internetCount={internetPlans.length}
            comboCount={comboPlans.length}
            onChange={handleTabChange}
          />
        </Box>

        {/* Search + Sort toolbar */}
        <Box
          bg="rgba(255,255,255,0.03)"
          border="1px solid"
          borderColor="glass.border"
          borderRadius="2xl"
          p={3}
        >
          <Flex gap={2.5} direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
            {/* Search input */}
            <Box position="relative" flex={1}>
              <Flex
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                align="center"
                pointerEvents="none"
                color="text.muted"
              >
                <IconSearch />
              </Flex>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.searchPlaceholder')}
                pl="2.5rem"
                pr={isFiltered ? '2.5rem' : 4}
                h="40px"
                bg="rgba(255,255,255,0.05)"
                border="1px solid"
                borderColor={isFiltered ? 'brand.600' : 'rgba(255,255,255,0.1)'}
                color="white"
                borderRadius="xl"
                fontSize="sm"
                _placeholder={{ color: 'text.subtle', fontSize: 'sm' }}
                _focus={{
                  borderColor: 'brand.500',
                  bg: 'rgba(109,45,219,0.08)',
                  boxShadow: '0 0 0 1px rgba(109,45,219,0.35)',
                  outline: 'none',
                }}
                transition="all 0.18s ease"
              />
              {isFiltered && (
              <Box
                as="button"
                position="absolute"
                right={2.5}
                top="50%"
                transform="translateY(-50%)"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.15)"
                  color="text.muted"
                  cursor="pointer"
                  transition="all 0.15s ease"
                  _hover={{ bg: 'rgba(255,255,255,0.25)', color: 'white' }}
                >
                  <IconX />
                </Box>
              )}
            </Box>

            {/* Sort dropdown */}
            <SortDropdown value={sortMode} options={sortOptions} onChange={setSortMode} />
          </Flex>

          {/* Results / hint row */}
          <Flex align="center" gap={2} mt={2} px={0.5}>
            {isFiltered ? (
              <>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  bg={visibleCount > 0 ? 'rgba(109,45,219,0.25)' : 'rgba(239,68,68,0.2)'}
                  border="1px solid"
                  borderColor={visibleCount > 0 ? 'brand.600' : 'rgba(239,68,68,0.4)'}
                >
                  <Text fontSize="xs" fontWeight={600} color={visibleCount > 0 ? 'brand.300' : 'red.400'}>
                    {visibleCount} / {totalCount}
                  </Text>
                </Box>
                <Text fontSize="xs" color="text.muted" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {t('home.resultsFor')}{' '}
                  <Text as="span" color="brand.400" fontWeight={500}>"{searchQuery.trim()}"</Text>
                </Text>
              </>
            ) : (
              <Text fontSize="xs" color="text.subtle">
                {t('home.searchHint')}
              </Text>
            )}
          </Flex>
        </Box>

        {/* Plan grid */}
        {visiblePlans.length > 0 ? (
          <SimpleGrid
            className="plan-grid"
            key={activeTab}
            columns={{ base: 1, sm: 2, lg: 3 }}
            gap={{ base: 4, md: 5 }}
            animation={`${gridFade} 0.28s cubic-bezier(0.22,1,0.36,1) both`}
          >
            {visiblePlans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                entranceDelay={index * CARD_STAGGER_MS}
                onViewDetails={setSelectedPlan}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            bg="rgba(239,68,68,0.06)"
            border="1px solid"
            borderColor="rgba(239,68,68,0.25)"
            borderRadius="xl"
            px={4}
            py={6}
            textAlign="center"
          >
            <Text fontSize="2xl" mb={2}>🔍</Text>
            <Text fontSize="sm" fontWeight={600} color="white" mb={1}>
              {t('home.noSearchResults')}
            </Text>
            <Text fontSize="xs" color="text.muted">
              {t('home.noSearchResultsHint')}
            </Text>
          </Box>
        )}
      </VStack>

      <PlanDetailSheet
        plan={selectedPlan}
        whatsappNumber={whatsappNumber}
        onClose={() => setSelectedPlan(null)}
      />
    </>
  );
}
