import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEntries } from '@/sanity/loader/loadQuery'
import Entry from '@/components/pages/entry/Entry'
import { useRouteStore } from '@/store/store'
import { EntryPayload } from '@/types'

// const EntryPreview = dynamic(
//   () => import('@/components/pages/entry/EntryPreview'),
// )

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return generateStaticSlugs('entry')
}

export default async function PageSlugRoute({ params }: Props) {
  let entries: EntryPayload[] | undefined = useRouteStore.getState().entries

  if (!entries || entries.length === 0) {
    console.log('loading entries from sanity')
    const entriesPayload = await loadEntries()
    entries = entriesPayload.data?.entries
  } else {
    console.log('entries loaded from storage')
  }

  const entry = entries?.find((entry) => entry.slug === params.slug)

  return entry ? <Entry data={entry} /> : <div>loading...</div>
}
