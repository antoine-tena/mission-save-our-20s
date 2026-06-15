import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/icon'],

  css: ['~/assets/css/global.css', '~/assets/css/journal.css'],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000/api'
    }
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})

