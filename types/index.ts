import type { PortableTextBlock } from '@portabletext/types'
import type { Image, ImageDefinition } from 'sanity'

export type ImagePayload = Image & ImageDefinition

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
  ogImage?: ImagePayload
}

export interface EntryPayload {
  _type: string
  _id: string
  category?: CategoryPayload
  date?: string
  description?: string
  content?: string
  body?: PortableTextBlock[]
  image?: ImagePayload
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
