import BlogMeta from '@/components/pages/blog/BlogMeta'
import * as demo from '@/sanity/lib/demo.data'
import { urlForImage } from '@/sanity/lib/utils'
import { PostPayload, SettingsPayload } from '@/types'
import Head from 'next/head'

export interface PostPageHeadProps {
  settings: SettingsPayload
  post: PostPayload
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  const imageUrl = urlForImage(post.coverImage)
  return (
    <Head>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      <BlogMeta />
      {post.coverImage?.asset?._ref && imageUrl && (
        <meta
          property="og:image"
          content={imageUrl.width(1200).height(627).fit('crop').url()}
        />
      )}
    </Head>
  )
}
