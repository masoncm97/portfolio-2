import { create } from 'zustand'

type RouteState = {
  currentRoute: string
  siblingRoutes: string[]
  siblingAssets: Map<string, string>
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
  siblingAssets: new Map(),
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

  const currentIndex = siblingRoutes.indexOf(currentRoute)
  if (currentIndex === -1) return ''

  // Apply the modifier function and ensure the result is within bounds using modulo
  const newIndex = modifier(currentIndex) % siblingRoutes.length

  // Adjust for negative indices resulting from the modifier function
  return siblingRoutes[
    newIndex < 0 ? newIndex + siblingRoutes.length : newIndex
  ]
}

function getSiblingAssets(
  currentRoute: string,
  assetMap: Map<string, string>,
): Map<string, string> {
  if (!currentRoute || assetMap.size === 0) return new Map<string, string>()

  const assetArray = Array.from(assetMap)
  const currentKey = trimLeadingSlash(currentRoute)
  const index = assetArray.findIndex((asset) => asset[0] === currentKey)

  // Helper function to get the asset at a given index, wrapping around if necessary
  function getAssetAt(index: number): [string, string] {
    const validIndex = (index + assetArray.length) % assetArray.length
    return assetArray[validIndex]
  }

  if (index === -1) return new Map<string, string>()

  return new Map<string, string>([getAssetAt(index - 1), getAssetAt(index + 1)])
}

function trimLeadingSlash(str: string): string {
  return str.replace(/^\//, '')
}
