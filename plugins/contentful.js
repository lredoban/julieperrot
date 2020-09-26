const contentful = require("contentful")
const fs = require('fs-extra')
const marked = require('marked')
const consola = require('consola')

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

  entries.map( entry => {
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
    url: isMP4 ? url : twikify(url),
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

  const collections = entries.collections.map((collection, i) => {
    return {
      slug: collection.fields.slug,
      title: collection.fields.title,
      description: collection.fields.description ? marked(collection.fields.description, options) : false,
      type: preTypes[collection.fields.slug] ?  preTypes[collection.fields.slug] : false,
      images: collection.fields.images.map(img => cleanImage(img))
    }
  })
  const collectionTypes = entries.collectionTypes.map(type => {
    return {
      slug: type.fields.slug,
      title: type.fields.title,
      hero: {url: twikify(type.fields.hero.fields.file.url), size: type.fields.hero.fields.file.details.image},
      collections: type.fields.collections ?
                      type.fields.collections.map(col => collections.find(cl => cl.slug === col.fields.slug))
                      : []
    }
  })
  const instagramPosts = entries.instagramPosts.map(post => {
    return { ...post.fields }
  }).slice(0, 11)
  const homePage = {
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
  return { collectionTypes, instagramPosts, homePage }
}

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    try {
      fs.ensureFileSync('static/data/contentful.json')
      fs.writeJson('static/data/contentful.json', data, resolve(`Write Successful`) )
    } catch (e) {
      consola.error(`Write Failed. ${e}`)
      reject(`Write Failed. ${e}`)
    }
  })
}

const getCMSData = async function () {
  const entries = []
  let skip = 0
  let res = await client.getEntries({limit: 1000, include: 2, skip, order: '-sys.createdAt'})
  entries.push(...res.items)
  while (entries.length === skip + 1000) {
    skip += 1000
    res = await client.getEntries({limit: 1000, include: 2, skip, order: '-sys.createdAt'})
    entries.push(...res.items)
  }
  consola.info(`number of entries: ${entries.length}`)
  const sorted = sortByContentType(entries)
  const cleaned = cleanEntries(sorted)
  return writeData(cleaned)
}

const twikify = url => {
  return url.split('//images.ctfassets.net/bkf4htdwrnir/').join('image:contentful/')
}

fs.remove('../static/data/contentful.json')
getCMSData()
  .then(() => {
    consola.success('JSON Build Complete!')
  })
  .catch(err => {
    consola.error(err)
  })
