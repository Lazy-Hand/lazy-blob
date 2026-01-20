// @ts-expect-error: url module is available in node
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  alias: {
    '~/types': fileURLToPath(new URL('./types', import.meta.url))
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'shadcn-nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080'
    }
  },

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
  },

  i18n: {
    locales: [
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh.json',
        name: '简体中文'
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English'
      }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default'
  }
})
