'use client'

import Img from 'next/image'
import { client } from '@/sanity/lib/client'
import { useNextSanityImage } from 'next-sanity-image'
import type { Image } from 'sanity'
import { customImageBuilder } from '@/sanity/lib/utils'
import { decode } from 'blurhash'
import useAccessRouteStore from '@/hooks/useAccessRouteStore'
import { useEffect, useRef, useState } from 'react'
import { useUpdateCurrentRoute } from '@/hooks/useUpdateCurrentRoute'
import { useSetAssetMap } from '@/hooks/useSetAssetMap'
import { useGetSiblingAssets } from '@/hooks/useGetSiblingAssets'
import { useSearchParams } from 'next/navigation'
import SanityImage from './SanityImage'
import { useLoadSiblingAssets } from '@/hooks/useLoadSiblingAssets'
import classNames from 'classnames'
import { trimLeadingSlash } from '@/lib/client-util'

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
  useUpdateCurrentRoute(updateCurrentRoute)
  useSetAssetMap(updateAssetMap, assetMap)
  useGetSiblingAssets(siblingAssets)

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  useEffect(() => {
    updateSiblingAssets()
  }, [assetMap, updateSiblingAssets])

  const srcs = useLoadSiblingAssets(mode, currentRoute, assetMap, siblingAssets)
  console.log('srcs from ImageBox', srcs)
  console.log(currentRoute)
  return (
    <div
      className={`w-full rounded-[3px] bg-gray-50 ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {mode && mode === 'navigation' ? (
        <div>
          {Array.from(srcs).map(([key, value]) => (
            <Img
              key={key}
              src={value}
              className={classNames(
                key === trimLeadingSlash(currentRoute) ? 'z-10' : 'z-0',
                'absolute h-full w-full',
              )}
              alt={alt}
              width={width}
              height={height}
              sizes={size}
            />
          ))}
        </div>
      ) : (
        <SanityImage image={image} />
      )}
    </div>
  )
}
