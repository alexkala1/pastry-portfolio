// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,

  routeRules: {
    '/admin': { middleware: 'auth' },
    '/': { auth: false },
  },
  icons: {
    iconFonts: ['mdi', 'fa', 'ion', 'eva'], // Optional: Select icon libraries you want
  },
  css: ['vuetify/styles'], // Include Vuetify styles

  build: {
    transpile: ['vuetify'], // Ensure Vuetify is transpiled
  },

  vite: {
    define: {
      'process.env.DEBUG': false, // Fix for Vuetify warning
    },
  },
  vuetify: {
    // Configure Vuetify icon system
    icons: {
      iconfont: 'mdi',  // Use Material Design Icons (mdi)
    },
  },
  modules: ['@nuxt/fonts', '@nuxt/icon'],
  plugins: ['~/plugins/vuetify.ts'],
})