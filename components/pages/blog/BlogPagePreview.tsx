'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { blogPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { BlogPagePayload } from '@/types'
import BlogPage from './BlogPage'

type Props = {
  initial: QueryResponseInitial<BlogPagePayload | null>
}

export default function BlogPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<BlogPagePayload | null>(
    blogPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Blog document to see the preview!
      </div>
    )
  }

  return <BlogPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
