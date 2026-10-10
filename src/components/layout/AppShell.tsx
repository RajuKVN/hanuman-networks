import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/layout/Header';
import { usePlans } from '@/hooks/usePlans';

interface AppShellProps { children: React.ReactNode; }

function SignalArtwork(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="signal-art" aria-hidden="true">
      <div className="signal-orbit orbit-one" /><div className="signal-orbit orbit-two" />
      <div className="signal-orbit orbit-three" /><div className="signal-core"><span>HN</span></div>
      <div className="signal-label label-top"><span className="signal-led" /> {t('hero.connected')} <b>01</b></div>
      <div className="signal-label label-bottom"><span className="signal-bars"><i /><i /><i /><i /></span> {t('hero.signalCaption')}</div>
      <div className="spectrum-line" />
    </div>
  );
}

export function AppShell({ children }: AppShellProps): React.JSX.Element {
  const { operatorName, whatsappNumber, offerBanner } = usePlans();
  const { t } = useTranslation();
  const [offerDismissed, setOfferDismissed] = useState(false);
  const displayName = operatorName || 'Hanuman Networks';

  return (
    <Box className="app-shell" id="top">
      <Header operatorName={displayName} whatsappNumber={whatsappNumber} />
      <main className="page-main">
        {offerBanner?.enabled && !offerDismissed && (
          <section className="offer-banner" aria-label={t('hero.offerAriaLabel')}>
            <div className="offer-mark" aria-hidden="true">✳</div>
            <div className="offer-copy">
              {offerBanner.eyebrow && <p className="offer-eyebrow">{offerBanner.eyebrow}</p>}
              <h2>{offerBanner.title}</h2>
              {offerBanner.message && <p>{offerBanner.message}</p>}
            </div>
            {offerBanner.ctaLabel && offerBanner.ctaTarget === 'plans' && <a className="offer-cta" href="#plans">{offerBanner.ctaLabel}<span aria-hidden="true">↗</span></a>}
            <button className="offer-close" type="button" aria-label={t('hero.dismissOffer')} onClick={() => setOfferDismissed(true)}>×</button>
          </section>
        )}
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" /> {t('hero.eyebrow')}</p>
            <h1 id="hero-title">{t('hero.titleLine1')}<br /> <span>{t('hero.titleLine2')}</span> <em>{t('hero.titleAccent')}</em></h1>
            <p className="hero-description">{t('hero.description')}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#plans">{t('hero.findPlan')} <span aria-hidden="true">↘</span></a>
              <a className="button-secondary" href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#plans'} target={whatsappNumber ? '_blank' : undefined} rel={whatsappNumber ? 'noreferrer' : undefined}>{t('hero.talkToTeam')} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-footnote"><span className="hero-footnote-line" /> {t('hero.footnote')}</div>
          </div>
          <SignalArtwork />
          <div className="hero-index" aria-hidden="true">01 <span /> {t('hero.indexLabel')}</div>
        </section>
        <div className="section-divider"><span>{t('hero.sectionDivider')}</span><span className="divider-line" /><span className="divider-number">01 / 03</span></div>
        <div id="plans" className="plans-anchor">{children}</div>

      </main>
      <footer className="site-footer">
        <a href="#top" className="footer-brand"><span className="footer-mark">HN</span><span>{displayName}<small>{t('header.footerTagline')}</small></span></a>
        <Text className="footer-note">{t('header.tagline')}</Text>
        <div className="footer-meta"><span>{t('header.footerCategory')}</span><a href="#plans">{t('header.browsePlans')}</a></div>
      </footer>
    </Box>
  );
}
