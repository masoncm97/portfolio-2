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
  const updateAllEntries = useRouteStore((state) => state.updateAllEntries)
  let siblingRoutes = useRouteStore((state) => state.siblingRoutes)
  let siblingAssets = useRouteStore((state) => state.siblingAssets)
  let currentRoute = useRouteStore((state) => state.currentRoute)
  let assetMap = useRouteStore((state) => state.assetMap)
  let entries = useRouteStore((state) => state.entries)

  return {
    nextRoute,
    previousRoute,
    updateSiblingRoutes,
    updateSiblingAssets,
    updateCurrentRoute,
    updateAssetMap,
    updateAllEntries,
    siblingRoutes,
    siblingAssets,
    currentRoute,
    assetMap,
    entries,
  }
}
