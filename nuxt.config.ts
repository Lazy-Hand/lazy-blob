export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'shadcn-nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/fonts'
  ],

  app: {
    head: {
      link:[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Liu+Jian+Mao+Cao&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap'
        }
      ]
    }
  },

  devtools: {
    enabled: true
  },

  fonts: {
    provider: 'local'
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  }
})
