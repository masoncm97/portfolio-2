import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { loadSettings } from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  // const initial = await loadSettings()
  const menuItems = ['everything', '2d', 'photo', 'text']
  console.log('navbar', menuItems)

  // if (draftMode().isEnabled) {
  //   return <NavbarPreview initial={initial} />
  // }

  return <NavbarLayout data={menuItems} />
}
