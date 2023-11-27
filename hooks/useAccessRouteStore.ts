import { RouteStore, useRouteStore } from '@/store/store'

export default function useAccessRouteStore(): RouteStore {
  const nextRoute = useRouteStore((state) => state.nextRoute)
  const previousRoute = useRouteStore((state) => state.previousRoute)
  const updateSiblingRoutes = useRouteStore(
    (state) => state.updateSiblingRoutes,
  )
  const updateSiblingAssets = useRouteStore(
    (state) => state.updateSiblingAssets,
  )
  const updateCurrentRoute = useRouteStore((state) => state.updateCurrentRoute)
  const updateAssetMap = useRouteStore((state) => state.updateAssetMap)
  let siblingRoutes = useRouteStore((state) => state.siblingRoutes)
  let siblingAssets = useRouteStore((state) => state.siblingAssets)
  let currentRoute = useRouteStore((state) => state.currentRoute)
  let assetMap = useRouteStore((state) => state.assetMap)

  return {
    nextRoute,
    previousRoute,
    updateSiblingRoutes,
    updateSiblingAssets,
    updateCurrentRoute,
    updateAssetMap,
    siblingRoutes,
    siblingAssets,
    currentRoute,
    assetMap,
  }
}
