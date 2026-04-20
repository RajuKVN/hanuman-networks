/**
 * Format a number as Indian Rupees (₹).
 * Uses compact notation for values ≥ 1000 to keep UI tight.
 */
export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a 10-digit or 12-digit Indian mobile number for display.
 * Strips country code prefix "91" if present, then formats as XXXXX XXXXX.
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  if (local.length !== 10) return raw;
  return `${local.slice(0, 5)} ${local.slice(5)}`;
}

/**
 * Pluralise a label with a count.
 */
export function pluralise(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
