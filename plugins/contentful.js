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
    if (typeof contentTypes[contentTypeId] !== 'undefined') {
      if (!(contentTypes[contentTypeId] in sorted)) {
        sorted[contentTypes[contentTypeId]] = []
      }
      sorted[contentTypes[contentTypeId]].push(entry)
    }
  })
  return sorted
}

function cleanImage(image) {
  const features = image.fields.features ? image.fields.features : {
    rightGradient: false,
    bottomGradient: false,
    svgTop: false,
    svgType: false
  }
  return {
    url: image.fields.image.fields.file.url,
    size: image.fields.image.fields.file.details.image,
    rightBorder: features.rightGradient ? features.rightGradient : null,
    bottomBorder: features.bottomGradient ? features.bottomGradient : null,
    iconPosition: features.svgTop ? features.svgTop : null,
    icon: features.svgType ? features.svgType : null,
  }
}

function cleanEntries(entries) {
  const cleaned = {}
  const preTypes = entries.collectionTypes.reduce((ret, type) => {
    if (!type.fields.collections) {
      return ret
    }
    type.fields.collections.map(col => {
      if (typeof ret[col.fields.slug] === 'undefined') {
        ret[col.fields.slug] = []
      }
      ret[col.fields.slug].push(type.fields.slug)
    })
    return ret
  }, {})

  cleaned.collections = entries.collections.map((collection, i) => {
    return {
      slug: collection.fields.slug,
      title: collection.fields.title,
      description: collection.fields.description ? marked(collection.fields.description, options) : false,
      type: preTypes[collection.fields.slug] ?  preTypes[collection.fields.slug] : false,
      images: collection.fields.images.map(img => cleanImage(img))
    }
  })
  cleaned.collectionTypes = entries.collectionTypes.map(type => {
    return {
      slug: type.fields.slug,
      title: type.fields.title,
      hero: {url: type.fields.hero.fields.file.url, size: type.fields.hero.fields.file.details.image},
      collections: type.fields.collections ? 
                      type.fields.collections.map(col => cleaned.collections.find(cl => cl.slug === col.fields.slug))
                      : []
    }
  })
  cleaned.homePage = {
    presentation: marked(entries.homePage[0].fields.presentation, options),
    featured: entries.homePage[0].fields.featured.map(feat => {
      return {
        slug: feat.fields.slug,
        title: feat.fields.title,
        image: cleanImage(feat.fields.images[0]),
        type: preTypes[feat.fields.slug] ?  preTypes[feat.fields.slug][0] : ''
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
  let entries = await client.getEntries({limit: 1000})
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
