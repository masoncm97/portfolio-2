import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useEffect } from 'react'

export function useUpdateSlug(
  currentRoute: string,
  slugInUse: string,
  router: AppRouterInstance,
) {
  useEffect(() => {
    // console.log('slug', slugInUse)
    // console.log('storedCurrentRoute', currentRoute)
    // console.log('comparison', slugInUse !== currentRoute)
    if (currentRoute && slugInUse !== currentRoute) {
      router.push(currentRoute)
    }
  }, [router, currentRoute, slugInUse])

  return slugInUse
}
