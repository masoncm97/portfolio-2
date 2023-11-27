'use client'

import Img from 'next/image'
import { client } from '@/sanity/lib/client'
import { useNextSanityImage } from 'next-sanity-image'
import type { Image } from 'sanity'
import { customImageBuilder } from '@/sanity/lib/utils'
import { decode } from 'blurhash'
import useAccessRouteStore from '@/hooks/useAccessRouteStore'
import { useEffect, useState } from 'react'
import { useUpdateCurrentRoute } from '@/hooks/useUpdateCurrentRoute'
import { useSetAssetMap } from '@/hooks/useSetAssetMap'
import { useGetSiblingAssets } from '@/hooks/useGetSiblingAssets'
import { useSearchParams } from 'next/navigation'

interface ImageBoxProps {
  image?: Image
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  'data-sanity'?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
  ...props
}: ImageBoxProps) {
  const { asset, metadata } = image || {}

  const {
    currentRoute,
    assetMap,
    siblingAssets,
    updateSiblingAssets,
    updateCurrentRoute,
    updateAssetMap,
  } = useAccessRouteStore()
  const [src, setSrc] = useState('')
  useUpdateCurrentRoute(updateCurrentRoute)
  useSetAssetMap(updateAssetMap, assetMap)
  useGetSiblingAssets(siblingAssets)
  // const cache = await caches.open('my-cache')

  console.log('currentRoute from ImageBox', currentRoute)
  console.log('assetMap from ImageBox', assetMap)
  console.log('siblingAssets from ImageBox', siblingAssets)

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  useEffect(() => {
    updateSiblingAssets()
  }, [assetMap, updateSiblingAssets])

  useEffect(
    () =>
      void (async () => {
        const cache = await caches.open('sibling-asset-cache')
        console.log()
        const blob1 = await cache.match(siblingAssets[0])
        const blob2 = await blob1?.blob()
        console.log('blob2', blob2)
        // console.log(URL.createObjectURL(blob2!))
        if (blob2) {
          const img = URL.createObjectURL(blob2)
          console.log('img', img)
          setSrc(img)
        }
      })(),
    [siblingAssets],
  )

  const imageProps = useNextSanityImage(
    client,
    { asset },
    {
      imageBuilder: customImageBuilder,
    },
  )

  // Check to see if image
  return (
    <div
      className={`w-full rounded-[3px] bg-gray-50 ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {mode && mode === 'navigation' && src ? (
        <Img
          src={src}
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
        />
      ) : (
        <Img
          {...imageProps}
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
        />
      )}
    </div>
  )
}
