'use client'

import { Arrow } from './Arrow'
import Link from 'next/link'
import { useEntryNavigation } from '@/hooks/useEntryNavigation'
import { EntryPayload } from '@/types'

export interface ArrowNavProps {
  className?: string
  entries: EntryPayload[]
}

export function ArrowNav({ className, entries }: ArrowNavProps) {
  // const [nextRoute, previousRoute, error] = useEntryNavigation()

  console.log('arrow nav:', entries)

  return (
    <div>
      {/* {error && <p>Error</p>}
      <Link href="/">shit</Link>
      {nextRoute && previousRoute && (
        <div>
          <Arrow onClick={() => previousRoute()} className="rotate-180" />
          <Arrow onClick={() => nextRoute()} />
        </div>
      )} */}
    </div>
  )
}
