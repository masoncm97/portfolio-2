import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
// import { generateQuery, getTableElementStyle } from '@/lib/util'
import ImageBox from '@/components/shared/ImageBox'
import type { EntryPayload, FieldPayload } from '@/types'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import entry from '@/sanity/schemas/documents/entry'
import { ArrowNav } from '@/components/shared/ArrowNav'

export interface EntryProps {
  data: EntryPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

interface TableElementValue {
  value: string | undefined
  style: string | undefined
}
export async function Entry({ data, encodeDataAttribute }: EntryProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, location, description, date, image } = data ?? {}
  console.log('data', data)

  // async function generateTable(
  //   values: (string | undefined)[],
  // ): Promise<Map<string, TableElementValue | undefined>> {
  //   values.map((value, index) => {
  //     getTableElementStyle(index, values.length, true)
  //   })
  //   return new Map<string, TableElementValue | undefined>([])
  // }

  const table = new Map<string, string | undefined>([
    ['title', title],
    ['location', location],
    ['description', description],
    ['date', date],
  ])

  // function generateTableStyles(
  //   table: Map<string, string | undefined>,
  // ): Map<string, TableElementValue | undefined> {
  //   const tableData = new Map<string, TableElementValue | undefined>([])
  //   Array.from(table).map(([key, value], index) => {
  //     tableData.set(key, {
  //       value: value,
  //       style: getTableElementStyle(index, table.size, true),
  //     })
  //   })
  //   return tableData
  // }

  // const tableData = generateTableStyles(table)

  // console.log('tableData', tableData)

  // const entryData = await generateTable([title, location, description, date])

  // const entryData = new Map<string, TableElementValue | undefined>([
  //   ['title', {value: title, style: getTableElementStyle(0, 4, true)}]
  // ]);

  // const entryData = new Map<string, TableElementValue | undefined>([
  //   ['title', { value: title, style: getTableElementStyle(0, 4, true) }],
  //   ['location', { value: title, style: getTableElementStyle(0, 4, true) }],
  //   ['description', { value: title, style: getTableElementStyle(0, 4, true) }],
  //   ['date', { value: title, style: getTableElementStyle(0, 4, true) }],
  // ])

  // const tableElementStyle = await getTableElementStyle(
  //   index,
  //   entryData.size,
  //   true,
  // )

  return (
    <div>
      <div className="mb-14">
        <div className="mb-14">
          {/* Image  */}
          <ImageBox
            data-sanity={encodeDataAttribute?.('image')}
            image={image}
            // @TODO add alt field in schema
            alt=""
            classesWrapper="relative aspect-[16/9]"
          />
        </div>
        <div className="flex flex-col w-[20rem]">
          {Array.from(table).map(([key, value], index) => {
            if (!value) return null
            return (
              <p
                key={key}
                className={classNames(
                  getTableElementStyle(index, table.size, true),
                  'pl-2',
                )}
              >
                {`${key}: ${value}`}
              </p>
            )
          })}
          <ArrowNav />
        </div>
      </div>
    </div>
  )
}

export function getTableElementStyle(
  index: number,
  length: number,
  columnPriority: boolean = false,
) {
  return classNames(
    'border border-black',
    columnPriority
      ? index === length - 1
        ? 'border-b-[1px]'
        : 'border-b-0'
      : index === length - 1
        ? 'max-lg:border-b-[1px] lg:border-r-[1px]'
        : 'max-lg:border-b-0 lg:border-r-0',
  )
}

export default Entry
