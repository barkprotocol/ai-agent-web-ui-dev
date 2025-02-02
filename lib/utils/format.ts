/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string | undefined): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate a string to a specified length
 */
export function truncate(str: string | undefined, length = 10): string {
  if (!str || str.length <= length * 2) return str || ""
  return str.substring(0, length) + "..."
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
  if (number < 1000) return number.toString()
  if (number < 1_000_000) return `${(number / 1000).toFixed(1)}K`
  if (number < 1_000_000_000) return `${(number / 1_000_000).toFixed(1)}M`
  if (number < 1_000_000_000_000) return `${(number / 1_000_000_000).toFixed(1)}B`
  return `${(number / 1_000_000_000_000).toFixed(1)}T`
}

/**
 * Format date with time
 */
export function formatDateWithTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

