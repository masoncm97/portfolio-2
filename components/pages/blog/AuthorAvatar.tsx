import { urlForImage } from '@/sanity/lib/utils'
import type { AuthorPayload } from '@/types'
import Image from 'next/image'

export default function AuthorAvatar(props: AuthorPayload) {
  const { name, picture } = props
  const imageUrl = urlForImage(picture)
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        {imageUrl && (
          <Image
            src={
              picture?.asset?._ref
                ? imageUrl.height(96).width(96).fit('crop').url()
                : 'https://source.unsplash.com/96x96/?face'
            }
            className="rounded-full"
            height={96}
            width={96}
            // @TODO add alternative text to avatar image schema
            alt=""
          />
        )}
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
