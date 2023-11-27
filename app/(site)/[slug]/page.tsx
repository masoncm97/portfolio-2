import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEntry } from '@/sanity/loader/loadQuery'
import Entry from '@/components/pages/entry/Entry'

const EntryPreview = dynamic(
  () => import('@/components/pages/entry/EntryPreview'),
)

type Props = {
  params: { slug: string }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const { data: entry } = await loadEntry(params.slug)

//   return {
//     title: entry?.title,
//     description: entry?.description
//       ? entry.description
//       : (await parent).description,
//   }
// }

export function generateStaticParams() {
  return generateStaticSlugs('entry')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadEntry(params.slug)

  if (draftMode().isEnabled) {
    return <EntryPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Entry data={initial.data} />
}
