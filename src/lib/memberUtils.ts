// Utility functions for handling member IDs in URLs

export function encodeMemberIdForUrl(membershipId: string): string {
  // Replace slashes and other URL-unsafe characters with hyphens
  return membershipId.replace(/[\/\\]/g, '-')
}

export function decodeMemberIdFromUrl(urlId: string): string {
  // For now, return as-is since we're using hyphens
  // In the future, we could implement reverse mapping if needed
  return urlId
}

export function formatMemberIdForDisplay(membershipId: string): string {
  // Convert hyphens back to slashes for display
  return membershipId.replace(/-/g, '/')
}

export function generateMembershipId(): string {
  const year = new Date().getFullYear().toString().slice(-2)
  const sequence = Date.now().toString().slice(-3)
  const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
  return `LTC-${year}-${sequence}-${suffix}`
}