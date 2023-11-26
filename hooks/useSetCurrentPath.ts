import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function useSetCurrentPath(
  currentRoute: string,
  updateCurrentRoute: (currentRoute: string) => void,
) {
  const router = useRouter()
  const newSlug = usePathname()
  const isInitialMount = useRef(true)

  // Update stored route (currentRoute) when the slug changes
  useEffect(() => {
    updateCurrentRoute(newSlug)
  }, [newSlug, updateCurrentRoute])

  // If stored route (currentRoute) is updated after the initial render, push it onto the router
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (currentRoute && newSlug !== currentRoute) {
      router.push(currentRoute)
    }
  }, [router, currentRoute, newSlug])
}
