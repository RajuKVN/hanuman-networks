/** Approximate brand colours for well-known OTT services. */
const KNOWN: Record<string, string> = {
  'JIO HOTSTAR':      '#1A5FB4',
  'HOTSTAR':          '#1A5FB4',
  'ZEE5':             '#7B22C5',
  'SONY LIV':         '#C81912',
  'SONYLIV':          '#C81912',
  'DISCOVERY+':       '#0061A8',
  'AMAZON PRIME LITE':'#00A8E0',
  'AHA TELUGU':       '#E8003D',
  'AHA TAMIL':        '#E8003D',
  'SUN NXT':          '#E07000',
  'ETV WIN':          '#FF5C00',
  'HUNGAMA':          '#E50914',
  'SHEMAROO':         '#FF6B00',
  'STAGE':            '#6B21A8',
  'FRIDAY':           '#9333EA',
  'I TAP':            '#2563EB',
  'FANCODE':          '#10B981',
  'DISTRO TV':        '#3B82F6',
  'OM TV':            '#F59E0B',
  'PLAY BOX TV':      '#8B5CF6',
  'SMARTPLAY TV':     '#7C3AED',
  'NAMMA FLIX':       '#EF4444',
  'RAJ TV':           '#DC2626',
  'TRAVEL XP':        '#059669',
  'DANGAL PLAY':      '#D97706',
  'SHUCAE FILMS':     '#7C3AED',
  'WAVES':            '#0EA5E9',
  'JIO SAAVAN':       '#1DB954',
  'KANCHAN LANKA':    '#F97316',
  'CHANA JOR':        '#84CC16',
  'SHORTS TV':        '#FF0033',
  'RUN TV':           '#10B981',
  'PLAYSHORTS':       '#6366F1',
  'PLAY SHORTS':      '#6366F1',
  'AAO NXT':          '#F59E0B',
};

const FALLBACK_PALETTE = [
  '#7C3AED', '#2563EB', '#059669', '#D97706',
  '#DC2626', '#0EA5E9', '#8B5CF6', '#10B981',
];

function hashIndex(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i) | 0;
  return Math.abs(h) % FALLBACK_PALETTE.length;
}

export function getOttColor(name: string): string {
  return KNOWN[name] ?? FALLBACK_PALETTE[hashIndex(name)];
}

/** 2-letter abbreviation: initials if multi-word, first 2 chars if single word. */
export function getOttAbbr(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return (words[0] ?? '').slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}
