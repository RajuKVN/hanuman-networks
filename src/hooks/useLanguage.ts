import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE_LANG_KEY } from '@/utils/constants';

type SupportedLang = 'en' | 'te';

interface UseLanguageResult {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
}

export function useLanguage(): UseLanguageResult {
  const { i18n } = useTranslation();

  const setLang = useCallback(
    (nextLang: SupportedLang) => {
      void i18n.changeLanguage(nextLang);
      try {
        localStorage.setItem(LOCAL_STORAGE_LANG_KEY, nextLang);
      } catch {
        // localStorage may be blocked in private/incognito mode
      }
    },
    [i18n],
  );

  const lang: SupportedLang =
    i18n.language === 'te' || i18n.language.startsWith('te-') ? 'te' : 'en';

  return { lang, setLang };
}
