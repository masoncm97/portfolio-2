'use client'

import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import { generateQuery, getTableElementStyle } from '@/lib/client-util'
import classNames from 'classnames'
import useIsDeviceSize from '@/hooks/useIsDeviceSize'
import useWindowDimensions from '@/hooks/useWindowDimensions'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props

  const menuItems = data?.menuItems || ([] as MenuItem[])
  menuItems.unshift({ _type: 'home', title: 'Everything', slug: '/' })

  return (
    <div className="sticky top-0 z-10 flex flex-col lg:flex-row items-center bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:pl-18 lg:pr-32">
      {menuItems &&
        menuItems.map((menuItem, index) => {
          const href = resolveHref(
            menuItem?._type,
            generateQuery(menuItem?.title),
          )
          if (!href) {
            return null
          }
          return (
            <Link
              key={index}
              className={classNames(
                'w-[15rem] sm:w-[25rem] lg:max-w-[8rem] text-center',
                getTableElementStyle(index, menuItems.length),
              )}
              href={href}
            >
              {menuItem.title?.toLowerCase()}
            </Link>
          )
        })}
    </div>
  )
}
