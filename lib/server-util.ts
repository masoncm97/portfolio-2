function formatString(str: string): string {
  return str.replace(/[\u200B-\u200D\uFEFF]/g, '')
}

export function generateQuery(str: string | undefined): string {
  if (!str) return ''
  return formatString(str.toLowerCase())
}
