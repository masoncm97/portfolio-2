import { NextRequest, NextResponse } from 'next/server'
import { loadEntries } from '@/sanity/loader/loadQuery'

export async function GET() {
  const assetMap = await generateAssetMap()
  return NextResponse.json([...assetMap.entries()], { status: 200 })
}

async function generateAssetMap(): Promise<Map<string, string>> {
  const { data } = await loadEntries()
  console.log('data', data?.entries?.length)

  let map = new Map()
  data?.entries?.forEach((entry) => {
    if (entry.image) {
      map.set(
        entry.slug,
        trimImageSubstring(entry.image?.asset?._ref?.toString()),
      )
    }
  })
  console.log(map)
  return map
}

function trimImageSubstring(str: string | undefined): string | undefined {
  if (!str) return undefined
  return str.replace(/^image-/, '')
}
