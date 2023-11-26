import { RouteStore, useRouteStore } from '@/store/store'

export default function useAccessRouteStore(): RouteStore {
  const nextRoute = useRouteStore((state) => state.nextRoute)
  const previousRoute = useRouteStore((state) => state.previousRoute)
  const updateSiblingRoutes = useRouteStore(
    (state) => state.updateSiblingRoutes,
  )
  const updateCurrentRoute = useRouteStore((state) => state.updateCurrentRoute)
  let siblingRoutes = useRouteStore((state) => state.siblingRoutes)
  let currentRoute = useRouteStore((state) => state.currentRoute)
  return {
    nextRoute,
    previousRoute,
    updateSiblingRoutes,
    updateCurrentRoute,
    siblingRoutes,
    currentRoute,
  }
}
