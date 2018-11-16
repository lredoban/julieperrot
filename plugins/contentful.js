import * as contentful from 'contentful'
import marked from 'marked'

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" ');
};

const client = contentful.createClient({
  space: process.env.JULIEPERROT_SPACE || process.env.space,
  accessToken: process.env.JULIEPERROT_TOKEN || process.env.accessToken
})

const options = { gfm: true, tables: true, sanitize: false, renderer }

function sortByContentType(entries) {
  const sorted =  {}
  const contentTypes = {
    collection: 'collections',
    collectionType: 'collectionTypes',
    homePage: 'homePage',
    about: 'about',
    instagramPosts: 'instagramPosts'
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
  const url = image.fields.image.fields.file.url
  const isMP4 = url.slice(0, 8) === '//videos'
  const features = image.fields.features ? image.fields.features : {
    rightGradient: false,
    bottomGradient: false,
    svgTop: false,
    svgType: false
  }
  const cleaned = {
    url: url,
    size: isMP4 ? url.indexOf('SANDRO') !== -1 ?
      {width: 237, height: 421} : {width: 386, height: 514} 
      : image.fields.image.fields.file.details.image,
    rightBorder: features.rightGradient ? features.rightGradient : null,
    bottomBorder: features.bottomGradient ? features.bottomGradient : null,
    iconPosition: features.svgTop ? features.svgTop : null,
    icon: features.svgType ? features.svgType : null,
  }
  cleaned.video = isMP4
  return cleaned
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
      ret[col.fields.slug].push({slug: type.fields.slug, title: type.fields.title})
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
  cleaned.instagramPosts = entries.instagramPosts.map(post => {
    return { ...post.fields }
  }).slice(0, 11)
  cleaned.homePage = {
    heroText: entries.homePage[0].fields.heroText ? marked(entries.homePage[0].fields.heroText, options) : '',
    socialImage: entries.homePage[0].fields.socialImage.fields.file.url,
    socialDescription: entries.homePage[0].fields.socialDescription,
    seoDescription: entries.homePage[0].fields.seoDescription,
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
  let entries = await client.getEntries({limit: 1000, order: '-sys.createdAt'})
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

export { getCMSData, getSideColllections, getIndexOfType }
