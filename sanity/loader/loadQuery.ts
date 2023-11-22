import 'server-only'

import { draftMode } from 'next/headers'
import { client } from '@/sanity/lib/client'
import {
  homePageQuery,
  pagesBySlugQuery,
  projectBySlugQuery,
  settingsQuery,
  blogSettingsQuery,
  blogPageQuery,
  postBySlugQuery,
  postPageQuery,
} from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import {
  HomePagePayload,
  PagePayload,
  ProjectPayload,
  SettingsPayload,
  BlogSettingsPayload,
  PostPayload,
  BlogPagePayload,
  PostPagePayload,
} from '@/types'
import { queryStore } from './createQueryStore'
import { PostPageProps } from '@/components/pages/blog/post/PostPage'

const serverClient = client.withConfig({
  token,
  useCdn: true,
  stega: {
    // Enable stega if it's a preview deployment
    enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
  },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

// Automatically handle draft mode

export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options
  let cache: RequestCache = 'force-cache'

  // // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  // if (!usingCdn && Array.isArray(options.next?.tags)) {
  //   cache = 'force-cache'
  // }

  // let cache: RequestCache = 'force-cache'
  return queryStore.loadQuery(query, params, {
    cache,
    ...options,
    perspective,
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page', 'project'] } },
  )
}

export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { next: { tags: ['home', 'entries'] } },
  )
}

export function loadProject(slug: string) {
  return loadQuery<ProjectPayload | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`] } },
  )
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
}

export function loadBlogSettings() {
  return loadQuery<BlogSettingsPayload>(
    blogSettingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page', 'project'] } },
  )
}

export function loadBlogPage() {
  return loadQuery<BlogPagePayload>(
    blogPageQuery,
    {},
    { next: { tags: ['home', 'posts'] } },
  )
}

// export function getAllPostsSlugs() {
//   return async function () {
//     const slugs =
//       (await sanityFetch<string[]>({
//         query: postSlugsQuery,
//         tags: ['posts'],
//       })) || []
//     return slugs.map((slug) => ({ slug }))
//   }
// }

export function loadPost(slug: string) {
  return loadQuery<PostPayload | null>(
    postBySlugQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}

export function loadPostPage(slug: string, token?: string | null) {
  return loadQuery<PostPagePayload | null>(
    postPageQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}
