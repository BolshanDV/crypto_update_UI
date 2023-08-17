export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8080, // default: 3000
  },
  mode: 'spa',
  head: {
    title: 'upgrade_ui',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/style/fonts.css',
    '~assets/style/default.css',
    '~assets/style/input.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'vue-scrollto/nuxt'
  ],

  env: {
    PLAN_DETAILS_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8030' : 'https://cmd-root.com',
    CHECKOUT_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8082' : 'https://cmd-root.com',
    PAYMENT_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8097' : 'https://cmd-root.com',
    USER_DETAILS_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8010' : 'https://cmd-root.com',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    // дополнительные настройки
    // BaseURL: 'https://link-to-API'
  }
}
