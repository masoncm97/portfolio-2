import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { EntryListItem } from '@/components/pages/home/EntryListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { EntriesPayload, HomePagePayload } from '@/types'
import {
  generateQuery,
  generateSiblingRoutes,
  generateAssetMap,
} from '@/lib/client-util'
import { use, useContext, useEffect } from 'react'
import { useRouteStore } from '@/store/store'
import useAccessRouteStore from '@/hooks/useAccessRouteStore'
import Gallery from './Gallery'

export interface HomePageProps {
  data: EntriesPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents

  // const filteredEntries = entries?.filter((entry) => {
  //   return generateQuery(entry.category?.title) === category
  // })
  // updateAllEntries(entries)
  // updateAllEntries(entries)

  // const siblingRoutes = generateSiblingRoutes(entries)
  // const assetMap = generateAssetMap(entries)

  // useEffect(() => {
  //   updateSiblingRoutes(siblingRoutes)
  // }, [siblingRoutes, updateSiblingRoutes])

  // useEffect(() => {
  //   updateAllEntries(entries)
  // }, [entries, updateAllEntries])

  // useEffect(() => {
  //   updateAssetMap(assetMap)
  // }, [assetMap, updateAssetMap])

  return (
    <div className="space-y-20">
      <Gallery data={data} />
    </div>
  )
}

export default HomePage
