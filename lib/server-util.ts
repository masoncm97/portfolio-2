// 'use server'

import { EntryPayload } from '@/types'

// import classNames from 'classnames'

// function formatString(str: string): string {
//   return str.replace(/[\u200B-\u200D\uFEFF]/g, '')
// }

// export async function generateQuery(str: string | undefined): Promise<string> {
//   if (!str) return ''
//   return formatString(str.toLowerCase())
// }

// export async function getTableElementStyle(
//   index: number,
//   length: number,
//   columnPriority: boolean = false,
// ): Promise<string> {
//   return classNames(
//     'border border-black',
//     columnPriority
//       ? index === length - 1
//         ? 'border-b-[1px]'
//         : 'border-b-0'
//       : index === length - 1
//         ? 'max-lg:border-b-[1px] lg:border-r-[1px]'
//         : 'max-lg:border-b-0 lg:border-r-0',
//   )
// }

export function generateSiblingRoutes(
  entries: EntryPayload[] | undefined,
): string[] {
  if (!entries) return []
  return entries.map((entry) => `/${entry.slug}`)
}
