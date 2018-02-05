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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
    '@/assets/sass/style.sass'
  ],
  render: {
    csp: {
      enabled: true
    }
  },
  loading: false
}
