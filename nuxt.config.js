export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'apollo-client-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  hooks: {
    render: {
      errorMiddleware(app) {
        app.use((error, req, res, next) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log('render:errorMiddleware nuxt hook ran, redirecting ...')
            res.writeHead(307, {
              Location: '/network-error',
            })
            res.end()
          }
        })
      },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/apollo'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = 'inline-source-map'
      }
    },
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/client.config.js',
    },
    defaultOptions: {
      $query: {
        // See: https://www.apollographql.com/docs/react/data/error-handling/#error-policies
        errorPolicy: 'all',
      },
    },
    errorHandler: '~/apollo/nuxt-apollo-error-handler.js',
  },
}
