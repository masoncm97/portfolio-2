'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Arrow } from './Arrow'
import { useEffect, useRef, useState } from 'react'
import useAccessRouteStore from '@/hooks/useAccessRouteStore'
import Link from 'next/link'
import { useSetCurrentPath } from '@/hooks/useSetCurrentPath'
import { useUpdateSlug } from '@/hooks/useUpdateSlug'
import { useSetSiblingPaths } from '@/hooks/useSetSiblingRoutes'
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
