/**
 * Maps every OTT app name to its official website domain so we can
 * resolve a high-quality icon via Google's reliable favicon CDN.
 *
 * null  = very regional / no public domain → always use letter-avatar fallback.
 * Admin: add a new entry here whenever a new OTT app is added to plans.json.
 */
export const OTT_DOMAINS: Record<string, string | null> = {
  /* ── Tier-1 national OTTs ──────────────────────────────────────── */
  'JIO HOTSTAR':        'jiohotstar.com',
  'ZEE5':               'zee5.com',
  'SONY LIV':           'sonyliv.com',
  'DISCOVERY+':         'discoveryplus.com',
  'AMAZON PRIME LITE':  'primevideo.com',
  'HUNGAMA':            'hungama.com',
  'SHEMAROO':           'shemaroome.com',
  'JIO SAAVAN':         'jiosaavn.com',
  'FANCODE':            'fancode.com',
  'DANGAL PLAY':        'dangalplay.com',

  /* ── South Indian / regional OTTs ─────────────────────────────── */
  'AHA TELUGU':         'aha.video',
  'AHA TAMIL':          'aha.video',
  'SUN NXT':            'sunnxt.com',
  'ETV WIN':            'etvwin.com',
  'NAMMA FLIX':         'nammaflix.com',
  'RAJ TV':             'rajdigital.in',
  'KANCHAN LANKA':      null,
  'CHANA JOR':          null,
  'RUN TV':             null,
  'SHUCAE FILMS':       null,

  /* ── Niche / aggregator platforms ─────────────────────────────── */
  'STAGE':              'stage.in',
  'DISTRO TV':          'distro.tv',
  'TRAVEL XP':          'travelxp.com',
  'SHORTS TV':          'shorts.tv',
  'PLAYSHORTS':         null,
  'PLAY SHORTS':        null,
  'WAVES':              null,
  'AAO NXT':            'aaonxt.com',
  'I TAP':              null,
  'OM TV':              null,
  'PLAY BOX TV':        null,
  'SMARTPLAY TV':       null,
  'FRIDAY':             null,
};

/**
 * Returns a Google-served high-quality 64 × 64 favicon PNG for any domain.
 * Google caches these images on their CDN — highly reliable, no API key needed.
 */
export function ottFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

/** Resolve domain for a given OTT name, or null if unknown/niche. */
export function getOttDomain(name: string): string | null {
  return OTT_DOMAINS[name] ?? null;
}
