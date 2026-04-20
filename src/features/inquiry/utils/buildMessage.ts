import { type Plan } from '@/schemas/plan.schema';
import { formatRupees } from '@/utils/format';

interface InquiryData {
  name: string;
  mobile: string;
  area: string;
}

/**
 * Build an emoji-formatted WhatsApp message for an inquiry.
 * Bilingual: English + Telugu side by side so the operator always understands.
 */
export function buildMessage(plan: Plan, inquiry: InquiryData): string {
  const lines = [
    `🙏 *నమస్కారం! / Hello!*`,
    ``,
    `📺 *Plan Enquiry / ప్లాన్ విచారణ*`,
    `• Plan: *${plan.name}*`,
    `• Price / ధర: *${formatRupees(plan.price)}/mo*`,
    `• Validity / చెల్లుబాటు: *${plan.validityDays} days*`,
    plan.ottCount > 0 ? `• OTT Apps: *${plan.ottCount} apps*` : null,
    plan.tvChannels !== null ? `• TV Channels: *${plan.tvChannels}*` : null,
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
