import { create } from 'zustand'
import { createStore } from 'zustand'
import { createContext } from 'react'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

export const RouteContext = createContext<RouteStore | null>(null)

export interface RouteProps {
  currentRoute: string
  siblingRoutes: string[]
}

interface RouteState extends RouteProps {
  setState: (routeProps: RouteProps) => void
  nextRoute: () => void
  previousRoute: () => void
}

type RouteStore = ReturnType<typeof createRouteStore>

export const createRouteStore = (initProps?: Partial<RouteProps>) => {
  const DEFAULT_PROPS: RouteProps = {
    currentRoute: '',
    siblingRoutes: [],
  }

  return createStore<RouteState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setState: (routeProps: RouteProps) =>
      set(() => ({
        currentRoute: routeProps.currentRoute,
        siblingRoutes: routeProps.siblingRoutes,
      })),
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
}

// export const useRouteStore = create<RouteState>()((set) => ({
//   currentRoute: '',
//   siblingRoutes: [],
//   setState: (currentRoute, siblingRoutes) =>
//     set(() => ({
//       currentRoute: currentRoute,
//       siblingRoutes: siblingRoutes,
//     })),
//   nextRoute: () =>
//     set((state) => ({
//       currentRoute: getNextRoute(
//         state.currentRoute,
//         state.siblingRoutes,
//         (index: number) => index + 1,
//       ),
//     })),
//   previousRoute: () =>
//     set((state) => ({
//       currentRoute: getNextRoute(
//         state.currentRoute,
//         state.siblingRoutes,
//         (index: number) => index - 1,
//       ),
//     })),
// }))

function getNextRoute(
  currentRoute: string,
  siblingRoutes: string[],
  modifier: (number) => number,
) {
  if (!siblingRoutes || siblingRoutes.length === 0) return ''
  const index = siblingRoutes.indexOf(currentRoute)
  if (modifier(index) === siblingRoutes.length) {
    return siblingRoutes[0]
  }
  return siblingRoutes[modifier(index)]
}
