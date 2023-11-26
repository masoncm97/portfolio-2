'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Arrow } from './Arrow'

import { useRouteStore } from '@/lib/store'
import { useContext, useEffect, useRef, useState, useMemo } from 'react'
import { useStore } from 'zustand'
import Link from 'next/link'

export function ArrowNav({ className }: { className?: string }) {
  const arrowStyle = 'absolute h-[1px] bg-black'
  const arrowPoint = 'w-4 translate-x-[180%]'
  const router = useRouter()

  const isInitialMount = useRef(true)

  const [loadedStorage, setLoadedStorage] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getNextRoute = useRouteStore((state) => state.nextRoute)
  const getPreviousRoute = useRouteStore((state) => state.previousRoute)
  const updateSiblingRoutes = useRouteStore(
    (state) => state.updateSiblingRoutes,
  )
  const updateCurrentRoute = useRouteStore((state) => state.updateCurrentRoute)

  const memoizedGetNextRoute = useMemo(() => getNextRoute, [getNextRoute])
  const memoizedGetPreviousRoute = useMemo(
    () => getPreviousRoute,
    [getPreviousRoute],
  )
  const memoizedUpdateSiblingRoutes = useMemo(
    () => updateSiblingRoutes,
    [updateSiblingRoutes],
  )
  const memoizedUpdateCurrentRoute = useMemo(
    () => updateCurrentRoute,
    [updateCurrentRoute],
  )

  let storedSiblingRoutes = useRouteStore((state) => state.siblingRoutes)
  let storedCurrentRoute = useRouteStore((state) => state.currentRoute)

  const slug = usePathname()

  useEffect(() => {
    if (isInitialMount.current) {
      console.log('Setting from storage:', storedSiblingRoutes)
      memoizedUpdateSiblingRoutes(storedSiblingRoutes)
      setLoadedStorage(true)
    }
  }, [storedSiblingRoutes, memoizedUpdateSiblingRoutes])

  useEffect(() => {
    console.log('Setting current path:', slug)
    memoizedUpdateCurrentRoute(slug)
  }, [slug, memoizedUpdateCurrentRoute])

  // useEffect(() => {
  //   router.push(storedCurrentRoute)
  // }, [router, storedCurrentRoute])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!storedSiblingRoutes || storedSiblingRoutes.length === 0) {
      // Function to fetch data
      const fetchData = async () => {
        setIsLoading(true) // Start loading
        setError(null) // Reset error state
        try {
          console.log('Setting from api:')
          const response = await fetch('/api/routes')
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }
          const result = await response.json()

          // setSiblingRoutes(result)
          memoizedUpdateSiblingRoutes(result)
          // setData(result) // Set the data
        } catch (err) {
          setError(err.message) // Handle errors
        } finally {
          setIsLoading(false) // End loading
        }
      }

      // Call the fetchData function
      fetchData()
    }
  }, [storedSiblingRoutes, memoizedUpdateSiblingRoutes, loadedStorage])

  return (
    <div>
      <Link href="/">shit</Link>
      <Arrow
        onClick={() => memoizedGetPreviousRoute()}
        className="rotate-180"
      />
      <Arrow onClick={() => memoizedGetNextRoute()} />
    </div>
  )
}

// export function useInitRouteState(): StoreApi<RouteState> | null {
//   const store = useContext(RouteContext)
//   const siblingRoutes = useGetSiblingRoutes(store)
//   if (!store) throw new Error('Missing RouteContext.Provider in the tree')
//   store.setState({ currentRoute: '', siblingRoutes: siblingRoutes })
//   return store
// }
