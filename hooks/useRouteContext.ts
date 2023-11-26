// // Mimic the hook returned by `create`
// import { RouteContext, RouteState } from '@/lib/store'
// import { useContext } from 'react'
// import { StoreApi, useStore } from 'zustand'

// export function useRouteContext<T>(
//   store: StoreApi<RouteState> | null,
//   selector: (state: RouteState) => T,
// ): T {
//   //   const store = useContext(RouteContext)
//   if (!store) throw new Error('Missing RouteContext.Provider in the tree')
//   // store.setState({
//   //   currentRoute: '',
//   //   siblingRoutes: [],
//   // })
//   return useStore(store, selector)
// }
