module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'hopestore-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'semantic-ui-vue/nuxt', // includes styles from semantic-ui-css
    ['semantic-ui-vue/nuxt', { css: false }], // if you have your own semantic-ui styles
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'https://api.gnavi.co.jp',
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
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
  }
}

