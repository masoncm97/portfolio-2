// import 'styles/index.css'

import { toPlainText } from '@portabletext/react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import Image from 'next/image'
import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'
import Link from 'next/link'

// const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'))

// export async function generateMetadata(): Promise<Metadata> {
//   const [{ data: settings }, { data: homePage }] = await Promise.all([
//     loadSettings(),
//     loadHomePage(),
//   ])

//   const ogImage = urlForOpenGraphImage(settings?.ogImage)
//   return {
//     title: homePage?.title
//       ? {
//           template: `%s | ${homePage.title}`,
//           default: homePage.title || 'Personal website',
//         }
//       : undefined,
//     description: homePage?.overview
//       ? toPlainText(homePage.overview)
//       : undefined,
//     openGraph: {
//       images: ogImage ? [ogImage] : [],
//     },
//   }
// }

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <div className="sm:flex sm:flex-col-reverse lg:flex-row lg:max-w-screen sm:items-center justify-between">
          <Suspense>
            <Navbar />
          </Suspense>
          <h1 className="max-sm:hidden lg:mr-20 text-2xl">Mason Mathai</h1>
        </div>
        <div>
          <Suspense>{children}</Suspense>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
      {/* {draftMode().isEnabled && <VisualEditing />} */}
    </>
  )
}
