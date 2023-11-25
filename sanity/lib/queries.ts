import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    entries[]->{
      _type,
      category->{title},
      date, 
      description, 
      content, 
      image, 
      secondaryImage,
      location, 
      "slug": slug.current,
      title,
    },
    title,
  }
`

export const entryBySlugQuery = groq`
  *[_type == "entry" && slug.current == $slug][0] {
    _id,
    category->{title},
    date, 
    description, 
    content, 
    image, 
    secondaryImage,
    "slug": slug.current,
    location, 
    tags, 
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`

export const getAllSlugs = groq`
 *[_type == "home"][0]{
    entries[]->{
      "slug": slug.current,
    }
  }
`
