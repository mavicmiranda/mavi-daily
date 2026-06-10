/** Returns today's date as YYYY-MM-DD in the browser's local timezone. */
export function localToday(): string {
  return new Date().toLocaleDateString('sv') // 'sv' locale always gives YYYY-MM-DD
}

/** Returns the date of a Daily entry as YYYY-MM-DD in local time. */
export function entryDay(date?: string, created_at?: string): string {
  if (date) return date
  if (created_at) return new Date(created_at).toLocaleDateString('sv')
  return ''
}
