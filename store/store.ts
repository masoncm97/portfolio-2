import { create } from 'zustand'

type RouteState = {
  currentRoute: string
  siblingRoutes: string[]
}

type RouteActions = {
  updateCurrentRoute: (currentRoute: RouteState['currentRoute']) => void
  updateSiblingRoutes: (siblingRoutes: RouteState['siblingRoutes']) => void
  nextRoute: () => void
  previousRoute: () => void
}

export type RouteStore = RouteState & RouteActions

export const useRouteStore = create<RouteState & RouteActions>()((set) => ({
  currentRoute: '',
  siblingRoutes: [],
  updateCurrentRoute: (currentRoute) =>
    set(() => ({ currentRoute: currentRoute })),
  updateSiblingRoutes: (siblingRoutes) =>
    set(() => ({ siblingRoutes: siblingRoutes })),
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
