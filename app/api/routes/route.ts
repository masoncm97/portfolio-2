import { NextRequest, NextResponse } from 'next/server'
import { loadEntries } from '@/sanity/loader/loadQuery'

export async function GET() {
  const routes = await generateSiblingRoutes()
  return NextResponse.json(routes, { status: 200 })
}

async function generateSiblingRoutes() {
  const { data } = await loadEntries()
  return data?.entries?.map((entry) => `/${entry.slug}`)
}
