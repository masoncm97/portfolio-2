import { useState, useRef, useEffect } from 'react'
import { trimLeadingSlash } from '@/lib/client-util'
export function useLoadSiblingAssets(
  mode: string | null,
  currentRoute: string,
  assetMap: Map<string, string>,
  siblingAssets: Map<string, string>,
) {
  const [srcs, setSrcs] = useState<Map<string, string>>(new Map())
  const srcsRef = useRef<Map<string, string> | null>(null)
  const [prev, next] = siblingAssets.keys()
  const currentKey = trimLeadingSlash(currentRoute)
  // console.log('shit', currentRoute, prev, next)

  useEffect(
    () =>
      void (async () => {
        if (mode === 'navigation' && prev && next) {
          await Promise.all([
            makeBlob(currentKey, assetMap),
            makeBlob(prev, assetMap),
            makeBlob(next, assetMap),
          ]).then((blobs) => {
            setSrcs(new Map<string, string>(blobs))
          })
        }
      })(),
    [assetMap, currentRoute, mode, prev, next],
  )

  useEffect(() => {
    srcsRef.current = srcs
  }, [srcs])

  useEffect(() => {
    return () => {
      if (srcsRef.current) {
        srcsRef.current.forEach((src) => {
          if (src) {
            URL.revokeObjectURL(src)
            // console.log('Blob URL revoked on unmount')
          }
        })
      }
    }
  }, [])

  return srcs
}

async function makeBlob(
  currentKey: string,
  assetMap: Map<string, string>,
): Promise<[string, string]> {
  // console.log('currentKey', currentKey)
  const currentAsset = assetMap.get(currentKey)
  // console.log('currentAsset', currentAsset)
  const cache = await caches.open('sibling-asset-cache')
  let img = ''
  if (currentAsset) {
    const resp = await cache.match(currentAsset)
    // console.log('resp', resp)
    const blob = await resp?.blob()
    // console.log('blob', blob)
    if (blob) {
      img = URL.createObjectURL(blob)
      // console.log('img', img)
    }
  }
  return [currentKey, img]
}
