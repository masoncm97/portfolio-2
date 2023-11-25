import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  entries?: EntryPayload[]
  title?: string
}

export type EntriesPayload = Pick<HomePagePayload, 'entries'>

export interface SettingsPayload {
  title?: string
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export interface EntryPayload {
  _type: string
  _id: string
  category?: CategoryPayload
  date?: string
  description?: string
  content?: string
  body?: PortableTextBlock[]
  image?: Image
  location?: string
  slug?: string
  title?: string
  tags?: string[]
}

export type SlugPayload = Pick<EntryPayload, 'slug'>

export interface CategoryPayload {
  _type: string
  _id: string
  title: string
}

export interface FieldPayload {
  title?: string
  value?: string
}
