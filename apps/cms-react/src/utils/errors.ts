export function getErrorMessage(e: unknown, fallback = 'An error occurred'): string {
  if (!e) return fallback
  if (e instanceof Error) return e.message
  if (typeof e === 'object' && e !== null && 'response' in e) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyE = e as any
      return anyE?.response?.data?.detail ?? fallback
    } catch {
      return fallback
    }
  }
  return String(e)
}
