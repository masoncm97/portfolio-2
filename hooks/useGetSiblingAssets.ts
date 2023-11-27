import { useEffect, useState } from 'react'

export async function useGetSiblingAssets(siblingAssets: string[]) {
  const [error, setError] = useState(null)
  useEffect(() => {
    if (siblingAssets && siblingAssets.length > 0) {
      let cache
      const fetchData = async (imageRef: string) => {
        cache = await caches.open('sibling-asset-cache')
        const cachedResponse = await cache.match(imageRef)
        console.log('loading siblings from api', siblingAssets)
        if (!cachedResponse) {
          setError(null)
          try {
            console.log('image not in cache: fetching...')
            await fetch(createSanityImageUrl(imageRef)).then((response) =>
              cache.put(imageRef, response),
            )
          } catch (err) {
            setError(err.message)
          }
        } else {
          console.log('image in cache')
        }
      }

      siblingAssets.forEach((imageRef) => {
        fetchData(imageRef)
      })
    }
  }, [siblingAssets, createSanityImageUrl])
}

function createSanityImageUrl(imageId: string): string {
  // Base URL for the Sanity CDN
  const baseUrl = 'https://cdn.sanity.io/images/nwlu3bfm/production/'

  // Extract the parts of the imageId
  const [id, dimensions, format] = imageId.split('-')

  // Replace 'jpg' with 'jpg?' to correctly format the URL
  const correctedFormat = format.replace('jpg', 'jpg?')

  // Construct the URL
  const url = `${baseUrl}${id}-${dimensions}.${correctedFormat}fm=webp&fit=max&auto=format`

  return url
}
