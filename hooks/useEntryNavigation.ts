import useAccessRouteStore from './useAccessRouteStore'
import { useSetCurrentPath } from './useSetCurrentPath'
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
  useSetCurrentPath(currentRoute, updateCurrentRoute)
  let error = useSetSiblingPaths(updateSiblingRoutes, siblingRoutes)

  return [nextRoute, previousRoute, error]
}
