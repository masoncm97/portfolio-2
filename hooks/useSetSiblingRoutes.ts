import { useEffect, useRef, useState } from 'react'

export function useSetSiblingPaths(
  updateSiblingRoutes: (siblingRoutes: string[]) => void,
  siblingRoutes: string[],
) {
  const isInitialMount = useRef(true)
  const [loadedStorage, setLoadedStorage] = useState<boolean>(false)
  const [error, setError] = useState(null)

  // Try to load siblingRoutes from local state only on initial render
  useEffect(() => {
    if (isInitialMount.current) {
      updateSiblingRoutes(siblingRoutes)
      setLoadedStorage(true)
    }
  }, [siblingRoutes, updateSiblingRoutes])

  // If unable to load siblingRoutes from local state, fetch from Sanity API
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!siblingRoutes || siblingRoutes.length === 0) {
      const fetchData = async () => {
        setError(null)
        try {
          const response = await fetch('/api/routes')
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }
          const result = await response.json()
          updateSiblingRoutes(result)
        } catch (err) {
          setError(err.message)
        }
      }

      fetchData()
    }
  }, [siblingRoutes, updateSiblingRoutes, loadedStorage])

  return error
}
