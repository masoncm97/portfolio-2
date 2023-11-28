'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { EntryListItem } from '@/components/pages/home/EntryListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { EntriesPayload, EntryPayload, HomePagePayload } from '@/types'
import { useSearchParams } from 'next/navigation'
import {
  generateQuery,
  generateSiblingRoutes,
  generateAssetMap,
} from '@/lib/client-util'
import { use, useContext, useEffect } from 'react'
import { useRouteStore } from '@/store/store'
import useAccessRouteStore from '@/hooks/useAccessRouteStore'

export interface GalleryProps {
  data: EntriesPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Gallery({ data, encodeDataAttribute }: GalleryProps) {
  const { entries = [] } = data ?? {}
  const searchParams = useSearchParams()
  //   const { updateAllEntries } = useAccessRouteStore()

  const category = searchParams.get('category')

  const filteredEntries = entries?.filter((entry) => {
    return generateQuery(entry.category?.title) === category
  })
  // updateAllEntries(entries)
  // updateAllEntries(entries)

  //   const siblingRoutes = generateSiblingRoutes(entries)
  //   const assetMap = generateAssetMap(entries)

  // useEffect(() => {
  //   updateSiblingRoutes(siblingRoutes)
  // }, [siblingRoutes, updateSiblingRoutes])

  //   useEffect(() => {
  //     updateAllEntries(entries)
  //   }, [entries, updateAllEntries])

  // useEffect(() => {
  //   updateAssetMap(assetMap)
  // }, [assetMap, updateAssetMap])

  return (
    <div className="space-y-20">
      {filteredEntries && filteredEntries.length > 0 && (
        <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {filteredEntries.map((entry, key) => {
            const href = resolveHref(entry._type, entry.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.(['entries', key, 'slug'])}
              >
                <EntryListItem entry={entry} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Gallery
