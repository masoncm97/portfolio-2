'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { entryBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EntryPayload } from '@/types'

import Entry from './Entry'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<EntryPayload | null>
}

export default function EntryPreview(props: Props) {
  console.log('iii')
  const { params, initial } = props
  const { data } = useQuery<EntryPayload | null>(entryBySlugQuery, params, {
    initial,
  })

  return <Entry data={data!} />
}
