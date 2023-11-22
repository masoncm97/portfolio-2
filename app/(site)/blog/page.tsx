import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { BlogPage } from '@/components/pages/blog/BlogPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadBlogPage } from '@/sanity/loader/loadQuery'

const BlogPagePreview = dynamic(
  () => import('@/components/pages/blog/BlogPagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadBlogPage()

  console.log(initial)

  if (draftMode().isEnabled) {
    return <BlogPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a blogpage yet,{' '}
        <Link href={`${studioUrl}/desk/blog`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <BlogPage data={initial.data} />
}
