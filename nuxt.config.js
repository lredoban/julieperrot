const contentful = require('./plugins/contentful.js')

const routesBackup = []
const routes = function (callback) {
  contentful.getCMSData()
  .then( data => {
    const collectionTypesRoutes = data.collectionTypes.map( type => {
      return `/${type.slug}`
    })
    const collectionsRoutes = data.collectionTypes.reduce((acc ,type) => {
      acc.push(...type.collections.map(col => {
        const currentType = contentful.getIndexOfType(data, type.slug)
        const currentIndex = contentful.getSideColllections(currentType.collections, col.slug)
        return `/${type.slug}/${col.slug}`
      }))
      return acc
    }, [])
    routesBackup.push(...collectionTypesRoutes, ...collectionsRoutes)
    callback(null, routesBackup)
  })
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Julie Perrot',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { property: 'og:site_name', content: 'Julie Perrot' },
      { property: 'og:type', content: 'website' },
      { name: 'theme-color', content: '#FCF0D9' },
      { name: 'google-site-verification', content: 'oZxd8KSJUlri04cFZR3LWVB7rnT34kg2dBuVh-Mmot4' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@JuliePerrot' },
      { property: 'twitter:creator', content: '@JuliePerrot' },
      { hid: 'url', property: 'og:url', content: 'https://juliperrot.com' },
      { hid: 'socialTitle', property: 'og:title', content: 'Julie Perrot' },
      { hid: 'description', hid: 'description', name: 'description', content: 'Julie Perrot Portfolio' },
      { hid: 'socialDescription', property: 'og:description', content: 'Julie Perrot Portfolio' },
      { hid: 'socialImage', property: 'og:image', content: 'https://julieperrot.com/images/meta.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    babel: {
      presets: ['vue-app', 'es2015']
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    'modern-normalize/modern-normalize.css',
    '@/assets/sass/style.sass'
  ],
  env: {
    space: process.env.JULIEPERROT_SPACE,
    accessToken: process.env.JULIEPERROT_TOKEN
  },
  generate: {
    subFolders: false,
    fallback: true,
    routes: routesBackup
  },
  loading: false,
  plugins: [
    { src: '~/plugins/basicscroll.js', ssr: false },
    '~/plugins/lazyload.js'
  ],
  modules: [
    ['@nuxtjs/google-analytics', {
      id: process.env.JULIEPERROT_UA,
      autoTracking: {
        skipSamePath: true
      }
    }],
    '~/modules/contentful',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    generate: true,
    routes,
    hostname: 'https://julieperrot.com'
  },
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }
}
