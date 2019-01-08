module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Cyborg Frontier Field',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'next project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css' },
    ]
  },
  css: [
    { src: '~assets/bulma.sass', lang: 'sass' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  modules: [
    ['nuxt-buefy', { css: false }],
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios', '~/vendor/api', '~/plugins/vuesax'],
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
  }
}
