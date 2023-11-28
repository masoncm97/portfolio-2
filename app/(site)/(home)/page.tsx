import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { HomePage } from '@/components/pages/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import { loadEntries } from '@/sanity/loader/loadQuery'
import { EntryPayload } from '@/types'
import { useContext } from 'react'
import { useRouteStore } from '@/store/store'
import Gallery from '@/components/pages/home/Gallery'

const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute() {
  const entries = await loadEntries()
  if (!entries.data) return <div>loading...</div>
  useRouteStore.setState({ entries: entries.data.entries })

  return <Gallery data={entries.data} />
}
