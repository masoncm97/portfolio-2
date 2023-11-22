import Container from '@/components/pages/blog/BlogContainer'
import BlogHeader from '@/components/pages/blog/BlogHeader'
import Layout from '@/components/pages/blog/BlogLayout'
import MoreStories from '@/components/pages/blog/MoreStories'
import PostBody from '@/components/pages/blog/post/PostBody'
import PostHeader from '@/components/pages/blog/post/PostHeader'
import PostPageHead from '@/components/pages/blog/post/PostPageHead'
import PostTitle from '@/components/pages/blog/post/PostTitle'
import SectionSeparator from '@/components/pages/blog/SectionSeparator'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import ImageBox from '@/components/shared/ImageBox'
import * as demo from '@/sanity/lib/demo.data'
import type { PostPagePayload, PostPayload } from '@/types'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { notFound } from 'next/navigation'
import type { Image } from 'sanity'

// export interface PostPageProps {
//   preview?: boolean
//   loading?: boolean
//   post: PostPayload
//   morePosts: PostPayload[]
//   settings: SettingsPayload
// }

// export interface BlogPageProps {
//   data: BlogPagePayload | null
//   encodeDataAttribute?: EncodeDataAttributeCallback
// }

export interface PostPageProps {
  data: PostPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

const NO_POSTS: PostPayload[] = []

export default function PostPage({ data, encodeDataAttribute }: PostPageProps) {
  const { post, moreStories } = data || {}
  const { title, coverImage, date, excerpt, author, content } = post || {}

  // const { title = demo.title } = settings || {}

  // const slug = post?.slug

  // if (!slug && !preview) {
  //   notFound()
  // }

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        {/* <Header title={title} description={overview} /> */}

        <div className="rounded-md border">
          {/* Image  */}
          <ImageBox
            data-sanity={encodeDataAttribute?.('coverImage')}
            image={coverImage}
            // @TODO add alt field in schema
            alt=""
            classesWrapper="relative aspect-[16/9]"
          />

          <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {/* Duration
            {!!(startYear && endYear) && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Duration</div>
                <div className="text-md md:text-lg">
                  <span data-sanity={encodeDataAttribute?.('duration.start')}>
                    {startYear}
                  </span>
                  {' - '}
                  <span data-sanity={encodeDataAttribute?.('duration.end')}>
                    {endYear}
                  </span>
                </div>
              </div>
            )} */}

            {/* Client */}
            {author && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Author</div>
                <div className="text-md md:text-lg">{author.name}</div>
              </div>
            )}

            {/* Site
            {site && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Site</div>
                {site && (
                  <Link
                    target="_blank"
                    className="text-md break-words md:text-lg"
                    href={site}
                  >
                    {site}
                  </Link>
                )}
              </div>
            )} */}

            {/* Tags
            <div className="p-3 lg:p-4">
              <div className="text-xs md:text-sm">Tags</div>
              <div className="text-md flex flex-row flex-wrap md:text-lg">
                {tags?.map((tag, key) => (
                  <div key={key} className="mr-1 break-words ">
                    #{tag}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Description */}
        {content && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-xl text-gray-600"
            value={content}
          />
        )}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}
