var contentful = require('contentful')
const marked = require('marked')

const client = contentful.createClient({
  space: process.env.space,
  accessToken: process.env.accessToken
})

const options = { gfm: true, tables: true, sanitize: false }

function sortByContentType(entries) {
  const sorted =  {}
  const contentTypes = {
    collection: 'collections',
    collectionType: 'collectionTypes',
    homePage: 'homePage'
  }

  entries.items.map( entry => {
    const contentTypeId = entry.sys.contentType.sys.id
    if (typeof contentTypes[contentTypeId] !== "undefined") {
      if (!(contentTypes[contentTypeId] in sorted)) {
        sorted[contentTypes[contentTypeId]] = []
      }
      sorted[contentTypes[contentTypeId]].push(entry)
    }
  })
  return sorted
}

function cleanImage(image) {
  return {
    url: image.fields.image.fields.file.url,
    border: image.fields.border ? image.fields.border : false,
    rightBorder: image.fields.rightBorder ? image.fields.rightBorder : false,
    bottomBorder: image.fields.bottomBorder ? image.fields.bottomBorder : false,
    iconPosition: image.fields.iconPosition ? image.fields.iconPosition : false,
    icon: image.fields.icon ? image.fields.icon : false,
  }
}

function cleanEntries(entries) {
  const cleaned = {}
  cleaned.collections = entries.collections.map(collection => {
    return {
      slug: collection.fields.slug,
      title: collection.fields.title,
      description: collection.fields.description ? marked(collection.fields.description, options) : false,
      type: collection.fields.type ? collection.fields.type.map(t => t.fields.title) : false,
      images: collection.fields.images.map(img => cleanImage(img))
    }
  })
  cleaned.homePage = {
    presentation: marked(entries.homePage[0].fields.presentation, options),
    featured: entries.homePage[0].fields.featured.map(feat => {
      return {
        slug: feat.fields.slug,
        title: feat.fields.title,
        image: cleanImage(feat.fields.images[0])
      }
    })
  }
  return cleaned
}

export async function getCMSData() {
  let entries = await client.getEntries()
  const sorted = sortByContentType(entries)
  return cleanEntries(sorted)
}
