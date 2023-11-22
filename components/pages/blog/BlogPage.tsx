import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/EntryListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { BlogPagePayload } from '@/types'

export interface BlogPageProps {
  data: BlogPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function BlogPage({ data, encodeDataAttribute }: BlogPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], posts = [], title = '' } = data ?? {}
  console.log(posts)
  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      {posts && posts.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {posts.map((post, key) => {
            const href = resolveHref(post._type, post.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={post} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BlogPage
