'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { EntryListItem } from '@/components/pages/home/EntryListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import { useSearchParams } from 'next/navigation'
import {
  generateQuery,
  generateSiblingRoutes,
  generateAssetMap,
} from '@/lib/client-util'
import { use, useContext, useEffect } from 'react'
import { useRouteStore } from '@/store/store'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], entries = [], title = '' } = data ?? {}

  const searchParams = useSearchParams()
  const updateSiblingRoutes = useRouteStore(
    (state) => state.updateSiblingRoutes,
  )
  const updateAssetMap = useRouteStore((state) => state.updateAssetMap)

  const category = searchParams.get('category')

  const filteredEntries = entries.filter((entry) => {
    return generateQuery(entry.category?.title) === category
  })

  console.log(entries)

  const siblingRoutes = generateSiblingRoutes(entries)
  const assetMap = generateAssetMap(entries)

  useEffect(() => {
    updateSiblingRoutes(siblingRoutes)
  }, [siblingRoutes, updateSiblingRoutes])

  useEffect(() => {
    updateAssetMap(assetMap)
  }, [assetMap, updateAssetMap])

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} />}
      {/* Showcase projects */}
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

export default HomePage
