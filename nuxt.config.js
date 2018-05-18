const contentful = require('./plugins/contentful.js');

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
      { hid: 'description', name: 'description', content: 'Julie Perrot Portfolio' },
      { property: 'og:title', content: 'Julie Perrot' },
      { property: 'og:site_name', content: 'Julie Perrot' },
      { property: 'og:url', content: 'https://juliperrot.com' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Julie Perrot Portfolio' },
      { property: 'og:image', content: 'img/Audrey.jpg' },
      { name: 'theme-color', content: '#FCF0D9' }
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
    routes: function (callback) {
      contentful.getCMSData()
      .then( data => {
        const collectionTypesRoutes = data.collectionTypes.map( type => {
          return {
            route: `/${type.slug}/`,
            payload: type
          }
        })
        const collectionsRoutes = data.collectionTypes.reduce((acc ,type) => {
          acc.push(...type.collections.map(col => {
            const currentType = contentful.getIndexOfType(data, type.slug)
            const currentIndex = contentful.getSideColllections(currentType.collections, col.slug)
            return {
              route: `/${type.slug}/${col.slug}`,
              payload: {
                ...col,
                prev: currentIndex === 0 ? false : currentType.collections[currentIndex - 1].slug,
                next: currentType.collections[currentIndex + 1] ? currentType.collections[currentIndex + 1].slug : false,
                hero: currentType.hero,
                type: currentType.title
              }
            }
          }))
          return acc
        }, [])
        callback(null, [...collectionTypesRoutes, ...collectionsRoutes])
      })
    },
    subFolders: false
  },
  loading: false,
  plugins: [
    { src: '~/plugins/basicscroll.js', ssr: false }
  ]
}
