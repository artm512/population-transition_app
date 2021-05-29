require('dotenv').config()
const { RESAS_API_KEY } = process.env

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'population-transition_app',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['modern-css-reset'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/vue-chart.js',
      ssr: true,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-webfontloader'],

  // other
  webfontloader: {
    google: {
      // https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap
      families: ['Noto Sans JP'],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  privateRuntimeConfig: {
    resasApiKey: RESAS_API_KEY,
  },

  publicRuntimeConfig: {
    resasApiKey: RESAS_API_KEY,
  },
}
