import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  entries?: EntryPayload[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface BlogPagePayload {
  title?: string
  overview?: PortableTextBlock[]
  posts?: PostPayload[]
}

export interface SettingsPayload {
  title?: string
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export interface AuthorPayload {
  name?: string
  picture?: any
}

export interface PostPayload {
  _type: string
  _id: string
  title?: string
  coverImage?: Image
  date?: string
  excerpt?: string
  author?: AuthorPayload
  slug?: string
  content?: any
}

export interface PostPagePayload {
  post: PostPayload
  moreStories: PostPayload[]
}

export interface BlogSettingsPayload {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface EntryPayload {
  _type: string
  _id: string
  category?: string
  date?: string
  description?: string
  content?: string
  image?: Image
  location?: string
  slug?: string
  title?: string
  tags?: string[]
}
