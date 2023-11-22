import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import PostPage from '@/components/pages/blog/post/PostPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPostPage } from '@/sanity/loader/loadQuery'

const PostPreview = dynamic(
  () => import('@/components/pages/blog/post/PostPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: postPage } = await loadPostPage(params.slug)
  const { post, moreStories } = postPage || {}
  const ogImage = urlForOpenGraphImage(post?.coverImage)

  return {
    title: post?.title,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export async function generateStaticParams() {
  return await generateStaticSlugs('post')
}

export default async function PostSlugRoute({ params }: Props) {
  const initial = await loadPostPage(params.slug)

  if (draftMode().isEnabled) {
    return <PostPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <PostPage data={initial.data} />
}
