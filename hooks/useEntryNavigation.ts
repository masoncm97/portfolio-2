import useAccessRouteStore from './useAccessRouteStore'
import { useUpdatePageSlug } from './useUpdatePageSlug'
import { useSetSiblingPaths } from './useSetSiblingRoutes'

export function useEntryNavigation() {
  const {
    currentRoute,
    siblingRoutes,
    updateCurrentRoute,
    updateSiblingRoutes,
    nextRoute,
    previousRoute,
  } = useAccessRouteStore()
  useUpdatePageSlug(currentRoute, updateCurrentRoute)
  let error = useSetSiblingPaths(updateSiblingRoutes, siblingRoutes)

  return [nextRoute, previousRoute, error]
}
