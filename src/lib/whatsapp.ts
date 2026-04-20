/**
 * Build a wa.me deep-link URL.
 * @param phone - E.164 style without '+', e.g. "919876543210"
 * @param message - Pre-filled text to send (will be URL-encoded)
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
