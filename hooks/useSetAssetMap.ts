import { useEffect, useRef, useState } from 'react'

export function useSetAssetMap(
  updateAssetMap: (assetMap: Map<string, string>) => void,
  assetMap: Map<string, string>,
) {
  const isInitialMount = useRef(true)
  const [loadedStorage, setLoadedStorage] = useState<boolean>(false)
  const [error, setError] = useState(null)

  // Try to load siblingRoutes from local state only on initial render
  useEffect(() => {
    if (isInitialMount.current) {
      console.log('loading from storage')
      updateAssetMap(assetMap)
      setLoadedStorage(true)
    }
  }, [assetMap, updateAssetMap])

  // If unable to load assetMap from local state, fetch from API
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!assetMap || assetMap.size === 0) {
      const fetchData = async () => {
        console.log('loading from api')
        setError(null)
        try {
          const response = await fetch('/api/asset-map')
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }
          const result = await response.json()
          const returnedMap = new Map<string, string>(result)
          updateAssetMap(returnedMap)
        } catch (err) {
          setError(err.message)
        }
      }

      fetchData()
    }
  }, [assetMap, updateAssetMap, loadedStorage])

  return error
}
