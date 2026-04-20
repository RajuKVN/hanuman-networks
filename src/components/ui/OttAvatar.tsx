import { Flex, chakra } from '@chakra-ui/react';
import React, { useState } from 'react';

import { getOttDomain, ottFaviconUrl } from '@/config/ottIcons';
import { getOttAbbr, getOttColor } from '@/features/detail/utils/ottColors';

interface OttAvatarProps {
  name: string;
  /** Square size in px — applies to both width and height. @default 28 */
  size?: number;
}

const Img = chakra('img');

/** Letter-avatar shown when no official favicon is available or the image fails. */
function LetterAvatar({ name, size }: { name: string; size: number }): React.JSX.Element {
  const color = getOttColor(name);
  const abbr  = getOttAbbr(name);
  return (
    <Flex
      flexShrink={0}
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="md"
      align="center"
      justify="center"
      bg={color}
      boxShadow={`0 2px 8px ${color}55`}
      fontSize={`${Math.max(Math.round(size * 0.3), 8)}px`}
      fontWeight={900}
      color="white"
      letterSpacing="0.02em"
    >
      {abbr}
    </Flex>
  );
}

/**
 * Displays the official favicon of an OTT platform.
 * Falls back to a branded letter-avatar if:
 *   • the OTT has no known public domain in ottIcons.ts
 *   • the favicon image fails to load (onError)
 */
export function OttAvatar({ name, size = 28 }: OttAvatarProps): React.JSX.Element {
  const [imgError, setImgError]   = useState(false);
  const [imgSmall, setImgSmall]   = useState(false);
  const domain = getOttDomain(name);

  if (!domain || imgError || imgSmall) {
    return <LetterAvatar name={name} size={size} />;
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    /* Google's favicon API returns a 16×16 grey-globe placeholder for unknown
       domains instead of a 404 — detect it so we can fall back to the letter avatar. */
    if (e.currentTarget.naturalWidth <= 16) setImgSmall(true);
  };

  return (
    <Flex
      flexShrink={0}
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="md"
      overflow="hidden"
      align="center"
      justify="center"
      bg={`${getOttColor(name)}18`}
    >
      <Img
        src={ottFaviconUrl(domain)}
        alt={name}
        w={`${size}px`}
        h={`${size}px`}
        objectFit="cover"
        onLoad={handleLoad}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </Flex>
  );
}
