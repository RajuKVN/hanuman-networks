import { type PricingOption, type UnifiedPlan } from '@/schemas/plan.schema';
import { formatRupees } from '@/utils/format';

interface InquiryData {
  name: string;
  mobile: string;
  area: string;
}

const PLAN_TYPE_LABELS: Record<UnifiedPlan['type'], string> = {
  ott:      'OTT Streaming',
  internet: 'Internet (WiFi)',
  combo:    'Internet + OTT',
};

/**
 * Build an emoji-formatted WhatsApp message for an inquiry.
 * Bilingual: English + Telugu so the operator always understands.
 */
export function buildMessage(
  plan: UnifiedPlan,
  inquiry: InquiryData,
  selectedPricing: PricingOption,
): string {
  const typeLabel = PLAN_TYPE_LABELS[plan.type];

  const ottLine =
    (plan.type === 'ott' || plan.type === 'combo') && plan.ottCount > 0
      ? `• OTT Apps: *${plan.ottCount} apps*`
      : null;

  const speedLine =
    plan.type === 'internet' || plan.type === 'combo'
      ? `• Speed / వేగం: *${plan.speedMbps} Mbps*`
      : null;

  const channelsLine =
    plan.type === 'combo' && plan.tvChannels !== null
      ? `• TV Channels / ఛానెళ్లు: *${plan.tvChannels}*`
      : null;

  const noteLine = plan.note ? `• Note: _${plan.note}_` : null;

  const lines = [
    `🙏 *నమస్కారం! / Hello!*`,
    ``,
    `📋 *Plan Enquiry / ప్లాన్ విచారణ*`,
    `• Type / రకం: *${typeLabel}*`,
    `• Plan: *${plan.name}*`,
    `• Duration / వ్యవధి: *${selectedPricing.label}*`,
    `• Price / ధర: *${formatRupees(selectedPricing.price)}*`,
    speedLine,
    ottLine,
    channelsLine,
    noteLine,
    ``,
    `👤 *Customer Details / వినియోగదారు వివరాలు*`,
    `• Name / పేరు: *${inquiry.name}*`,
    `• Mobile / మొబైల్: *${inquiry.mobile}*`,
    `• Area / ప్రాంతం: *${inquiry.area}*`,
    ``,
    `Please confirm availability and installation date.`,
    `దయచేసి అందుబాటు మరియు ఇన్‌స్టాలేషన్ తేదీని నిర్ధారించండి.`,
  ];

  return lines.filter((l) => l !== null).join('\n');
}
