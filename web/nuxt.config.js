export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lovelace-hackathon',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'server',
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/markdownit'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/node_modules/bootstrap/dist/css/bootstrap.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client",  }],

  buildModules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Source+Code+Pro': true,
      'Material+Symbols+Outlined': true
    }
  },

  strapi: {
    entities: ['questionbanks', 'Hackathoncontestants'],
    url: 'https://admin.lovelacehackathon.com',
    key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA0NjQ1OTZjNzAzMDAxMTg2M2NlYiIsImlhdCI6MTcwMTg1Njk0NCwiZXhwIjoxNzA0NDQ4OTQ0fQ.v95hvOBJ65hv_XorXNHUJUBkNPoGhH0q4CtpRUoRXhY'
  },
  
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],

  auth: {
    redirect: {
      callback: '/auth',
    },
    rewriteRedirects : true,
    strategies: {
      aad: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
          token:
            'https://login.microsoftonline.com/organizations/oauth2/v2.0/token',
          logout: false
      
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
          global: true,
          required: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        // ******** change this for your Application (Client) ID ********
        clientId: '40230a9a-c8e0-4306-95e4-3e65b92939a9',
        codeChallengeMethod: 'S256',
        scope: ['openid', 'profile'],
        autoLogout: true,
      },
    },
  },

  server: {
    port: 65521 // default: 3000
  },

  markdownit: {
    runtime: true // Support `$md()`
  }

}
