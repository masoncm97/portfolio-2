import { NextRequest, NextResponse } from 'next/server'
import { loadEntries } from '@/sanity/loader/loadQuery'

export async function GET() {
  const { data } = await loadEntries()
  return NextResponse.json(data, { status: 200 })
}
