import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useUpdateCurrentRoute } from './useUpdateCurrentRoute'

export function useUpdatePageSlug(
  currentRoute: string,
  updateCurrentRoute: (currentRoute: string) => void,
) {
  const router = useRouter()
  const isInitialMount = useRef(true)
  const newSlug = useUpdateCurrentRoute(updateCurrentRoute)

  // If stored route (currentRoute) is updated after the initial render, push it onto the router
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (currentRoute && newSlug !== currentRoute) {
      router.push(`${currentRoute}?mode=navigation`)
    }
  }, [router, currentRoute, newSlug])
}
