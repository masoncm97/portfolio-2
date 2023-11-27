'use client'

import { EntryPayload } from '@/types'
import classNames from 'classnames'

export function formatString(str: string): string {
  return str.replace(/[\u200B-\u200D\uFEFF]/g, '')
}

export function generateQuery(str: string | undefined): string {
  if (!str) return ''
  return formatString(str.toLowerCase())
}

export function getTableElementStyle(
  index: number,
  length: number,
  columnPriority: boolean = false,
) {
  return classNames(
    'border border-black',
    columnPriority
      ? index === length - 1
        ? 'border-b-[1px]'
        : 'border-b-0'
      : index === length - 1
        ? 'max-lg:border-b-[1px] lg:border-r-[1px]'
        : 'max-lg:border-b-0 lg:border-r-0',
  )
}

export function generateSiblingRoutes(
  entries: EntryPayload[] | undefined,
): string[] {
  if (!entries) return []
  return entries.map((entry) => `/${entry.slug}`)
}

export function generateAssetMap(
  entries: EntryPayload[] | undefined,
): Map<string, string> {
  let map = new Map()
  if (!entries) return map
  entries.forEach((entry) => {
    if (entry.image) {
      map.set(
        entry.slug,
        trimImageSubstring(entry.image?.asset?._ref?.toString()),
      )
    }
  })
  return map
}

function trimImageSubstring(str: string | undefined): string | undefined {
  if (!str) return undefined
  return str.replace(/^image-/, '')
}
