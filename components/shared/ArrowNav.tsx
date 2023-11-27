'use client'

import { Arrow } from './Arrow'
import Link from 'next/link'
import { useEntryNavigation } from '@/hooks/useEntryNavigation'

export function ArrowNav({ className }: { className?: string }) {
  const [nextRoute, previousRoute, error] = useEntryNavigation()

  return (
    <div>
      {error && <p>Error</p>}
      <Link href="/">shit</Link>
      {nextRoute && previousRoute && (
        <div>
          <Arrow onClick={() => previousRoute()} className="rotate-180" />
          <Arrow onClick={() => nextRoute()} />
        </div>
      )}
    </div>
  )
}
