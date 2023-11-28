import { EntryPayload } from '@/types'
import { useEffect, useRef, useState } from 'react'

export function useGetAllEntries(
  updateAllEntries: (entries: EntryPayload[]) => void,
  entries: EntryPayload[],
) {
  const isInitialMount = useRef(true)
  const [loadedStorage, setLoadedStorage] = useState<boolean>(false)
  const [error, setError] = useState(null)

  // Try to load entries from local state only on initial render
  useEffect(() => {
    if (isInitialMount.current) {
      updateAllEntries(entries)
      setLoadedStorage(true)
    }
  }, [entries, updateAllEntries])

  // If unable to load entries from local state, fetch from Sanity API
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!entries || entries.length === 0) {
      const fetchData = async () => {
        setError(null)
        try {
          const response = await fetch('/api/entries')
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }
          const result = await response.json()
          console.log('yahoo', result)
          updateAllEntries(result)
        } catch (err) {
          setError(err.message)
        }
      }

      fetchData()
    }
  }, [entries, updateAllEntries, loadedStorage])

  return error
}
