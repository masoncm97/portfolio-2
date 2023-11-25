'use client'

import { useRef } from 'react'
import { RouteContext, createRouteStore } from '@/lib/store'

export function Providers({ children }) {
  const store = useRef(createRouteStore()).current
  return <RouteContext.Provider value={store}>{children}</RouteContext.Provider>
}
