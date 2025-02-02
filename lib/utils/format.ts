/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return ''; // Guard clause for empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to a specified length
 */
export function truncate(str: string, length = 6): string {
  if (!str) return ''; // Guard clause for empty string
  if (str.length <= length * 2) return str; // No truncation needed if the string is short enough
  const start = str.slice(0, length);
  const end = str.slice(-length);
  return `${start}...${end}`;
}

/**
 * Format wallet address for display
 */
export function formatWalletAddress(
  address: string | undefined,
  length: number = 5,
): string {
  if (!address) return 'Anonymous';
  const start = address.slice(0, length);
  const end = address.slice(-length);
  return `${start}...${end}`;
}

/**
 * Format a number to a shorter version with K, M, B suffixes
 * Examples:
 * 1000 => 1K
 * 1_000_000 => 1M
 * 1_500_000_000 => 1.50B
 * 1_000_000_000_000 => 1T
 */
export function formatShortNumber(number: number): string {
  if (number < 1000) return number.toString();
  if (number < 1_000_000) return `${(number / 1000).toFixed(1)}K`;
  if (number < 1_000_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number < 1_000_000_000_000) return `${(number / 1_000_000_000).toFixed(1)}B`;
  return `${(number / 1_000_000_000_000).toFixed(1)}T`;
}

/**
 * Format date with time
 */
export function formatDateWithTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format Privy ID by removing prefix
 */
export function formatPrivyId(id: string | undefined): string {
  if (!id) return '';
  return id.replace('did:privy:', '');
}
