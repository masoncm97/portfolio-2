'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { RouteContext } from '@/lib/store'
import { Arrow } from './Arrow'
import { loadSlugs } from '@/sanity/loader/loadQuery'
import { generateSiblingRoutes } from '@/lib/siblingRoutes'

export function ArrowNav({ className }: { className?: string }) {
  const arrowStyle = 'absolute h-[1px] bg-black'
  const arrowPoint = 'w-4 translate-x-[180%]'
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const store = useContext(RouteContext)
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  console.log('store', store)
  const routes = useStore(store, (state) => state.siblingRoutes)
  console.log('routes', routes)

  function click() {
    if (!routes || routes.length === 0) {
      generateSiblingRoutes()
    }
  }

  return (
    <div>
      <Arrow onClick={click} className="rotate-180" />
      <Arrow onClick={click} />
    </div>
  )
}
