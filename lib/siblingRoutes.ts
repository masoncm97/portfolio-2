'use server'

import { loadSlugs } from '@/sanity/loader/loadQuery'

export async function generateSiblingRoutes() {
  await loadSlugs()
}
