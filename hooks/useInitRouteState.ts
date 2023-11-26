// import { RouteState, RouteContext, RouteProps } from '@/lib/store'
// import { useContext } from 'react'
// import { StoreApi } from 'zustand'
// import { useGetSiblingRoutes } from './useGetSiblingRoutes'

// export function useInitRouteState({
//   currentRoute = '',
//   siblingRoutes,
// }: Partial<RouteProps>): StoreApi<RouteState> | null {
//   const store = useContext(RouteContext)
//   if (!siblingRoutes || siblingRoutes.length < 0) {
//     siblingRoutes = useGetSiblingRoutes(store)
//   }
//   if (!store) throw new Error('Missing RouteContext.Provider in the tree')
//   store.setState({ currentRoute: currentRoute, siblingRoutes: siblingRoutes })
//   return store
// }
