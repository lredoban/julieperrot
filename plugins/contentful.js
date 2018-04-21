const contentful = require('contentful')
const marked = require('marked')

const client = contentful.createClient({
  space: process.env.JULIEPERROT_SPACE || process.env.space,
  accessToken: process.env.JULIEPERROT_TOKEN || process.env.accessToken
})

const options = { gfm: true, tables: true, sanitize: false }

function sortByContentType(entries) {
  const sorted =  {}
  const contentTypes = {
    collection: 'collections',
    collectionType: 'collectionTypes',
    homePage: 'homePage',
    about: 'about'
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
    rightBorder: image.fields.features.rightGradient ? image.fields.features.rightGradient : false,
    bottomBorder: image.fields.features.bottomGradient ? image.fields.features.bottomGradient : false,
    iconPosition: image.fields.features.svgTop ? image.fields.features.svgTop : false,
    icon: image.fields.features.svgType ? image.fields.features.svgType : false,
  }
}

function cleanEntries(entries) {
  const cleaned = {}
  cleaned.collections = entries.collections.map((collection, i) => {
    return {
      slug: collection.fields.slug,
      title: collection.fields.title,
      description: collection.fields.description ? marked(collection.fields.description, options) : false,
      type: collection.fields.type ? collection.fields.type.map(t => t.fields.title) : false,
      images: collection.fields.images.map(img => cleanImage(img))
    }
  })
  cleaned.collectionTypes = entries.collectionTypes.map(type => {
    return {
      slug: type.fields.slug,
      title: type.fields.title,
      hero: type.fields.hero.fields.file.url,
      collections: cleaned.collections.filter(col => col.type.includes(type.fields.title))
    }
  })
  cleaned.homePage = {
    presentation: marked(entries.homePage[0].fields.presentation, options),
    featured: entries.homePage[0].fields.featured.map(feat => {
      return {
        slug: feat.fields.slug,
        title: feat.fields.title,
        image: cleanImage(feat.fields.images[0]),
        type: feat.fields.type ? feat.fields.type[0].fields.slug : '' 
      }
    }),
    about: {
      presentation:  marked(entries.about[0].fields.presentation, options),
      image: cleanImage(entries.about[0].fields.image),
    }
  }
  return cleaned
}

const getCMSData = async function () {
  let entries = await client.getEntries()
  const sorted = sortByContentType(entries)
  return cleanEntries(sorted)
}

const getSideColllections = function (collections, slug) {
  return collections.reduce((currentIndex, col, i) => {
    if (currentIndex !== false) return currentIndex
    if (col.slug === slug) {
      return i
    }
    return false
  }, false)
}

const getIndexOfType = function (data, type) {
  return data.collectionTypes.filter(cType => cType.slug === type)[0]
}

exports.getCMSData = getCMSData
exports.getSideColllections = getSideColllections
exports.getIndexOfType = getIndexOfType
