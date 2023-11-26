import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useSetCurrentPath(
  currentRoute: string,
  updateCurrentRoute: (currentRoute: string) => void,
) {
  const router = useRouter()
  const newSlug = usePathname()

  // Update stored route (currentRoute) when the slug changes
  useEffect(() => {
    updateCurrentRoute(newSlug)
  }, [newSlug, updateCurrentRoute])

  // If stored route (currentRoute) is updated, push it onto the router
  useEffect(() => {
    router.push(currentRoute)
  }, [router, currentRoute])
}
