'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { PostPagePayload } from '@/types'

import PostPage from './PostPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PostPagePayload | null>
}

export default function PostPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<PostPagePayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <PostPage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
