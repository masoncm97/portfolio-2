import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function useUpdateCurrentRoute(
  updateCurrentRoute: (currentRoute: string) => void,
) {
  const newSlug = usePathname()

  // Update stored route (currentRoute) when the slug changes
  useEffect(() => {
    updateCurrentRoute(newSlug)
  }, [newSlug, updateCurrentRoute])

  return newSlug
}
