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

interface SanityImageProps {
  image?: Image
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  'data-sanity'?: string
}

export default function SanityImage({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
  ...props
}: SanityImageProps) {
  const { asset } = image || {}

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
      <Img
        {...imageProps}
        className="absolute h-full w-full"
        alt={alt}
        width={width}
        height={height}
        sizes={size}
      />
    </div>
  )
}
