import { create } from 'zustand'

type RouteState = {
  currentRoute: string
  siblingRoutes: string[]
  siblingAssets: string[]
  assetMap: Map<string, string>
}

type RouteActions = {
  updateCurrentRoute: (currentRoute: RouteState['currentRoute']) => void
  updateSiblingRoutes: (siblingRoutes: RouteState['siblingRoutes']) => void
  updateAssetMap: (assetMap: RouteState['assetMap']) => void
  nextRoute: () => void
  previousRoute: () => void
  updateSiblingAssets: () => void
}

export type RouteStore = RouteState & RouteActions

export const useRouteStore = create<RouteState & RouteActions>()((set) => ({
  currentRoute: '',
  siblingRoutes: [],
  siblingAssets: [],
  assetMap: new Map(),
  updateCurrentRoute: (currentRoute) =>
    set(() => ({ currentRoute: currentRoute })),
  updateSiblingRoutes: (siblingRoutes) =>
    set(() => ({ siblingRoutes: siblingRoutes })),
  updateAssetMap: (assetMap) => set(() => ({ assetMap: assetMap })),
  nextRoute: () =>
    set((state) => ({
      currentRoute: getNextRoute(
        state.currentRoute,
        state.siblingRoutes,
        (index: number) => index + 1,
      ),
    })),
  previousRoute: () =>
    set((state) => ({
      currentRoute: getNextRoute(
        state.currentRoute,
        state.siblingRoutes,
        (index: number) => index - 1,
      ),
    })),
  updateSiblingAssets: () =>
    set((state) => ({
      siblingAssets: getSiblingAssets(state.currentRoute, state.assetMap),
    })),
}))

function getNextRoute(
  currentRoute: string,
  siblingRoutes: string[],
  modifier: (number) => number,
) {
  if (!siblingRoutes || siblingRoutes.length === 0) return ''
  const index = siblingRoutes.indexOf(currentRoute)
  if (modifier(index) >= siblingRoutes.length) {
    return siblingRoutes[0]
  }
  if (modifier(index) <= 0) {
    return siblingRoutes[siblingRoutes.length - 1]
  }
  return siblingRoutes[modifier(index)]
}

function getSiblingAssets(
  currentRoute: string,
  assetMap: Map<string, string>,
): string[] {
  console.log('lit', currentRoute)
  if (!currentRoute || !assetMap || assetMap.size === 0) return []

  let assetArray = Array.from(assetMap)
  let currentKey = trimLeadingSlash(currentRoute)
  let index = assetArray.findIndex((asset) => asset[0] === currentKey)

  if (index === 0)
    return [assetArray[assetArray.length - 1][1], assetArray[index + 1][1]]
  if (index === assetArray.length - 1)
    return [assetArray[index - 1][1], assetArray[0][1]]
  if (index === -1) return []
  return [assetArray[index - 1][1], assetArray[index + 1][1]]
}

function trimLeadingSlash(str: string): string {
  return str.replace(/^\//, '')
}
