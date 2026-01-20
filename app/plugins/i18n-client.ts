import type { LanguagesApiResponse } from '~/types/i18n'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.client) {
    const i18n = nuxtApp.$i18n as any
    const config = useRuntimeConfig()

    try {
      const response = await $fetch<LanguagesApiResponse>(
        '/api/languages/all',
        {
          baseURL: config.public.apiBase as string
        }
      )

      if (response.success && response.data?.languageMessages) {
        const languageMessages = response.data.languageMessages

        for (const [localeCode, messages] of Object.entries(languageMessages)) {
          const targetLocale = localeCode === 'zh_CN' ? 'zh' : 'en'

          if (i18n.mergeLocaleMessage) {
            i18n.mergeLocaleMessage(targetLocale, messages)
          }
        }
      }
    } catch (error) {
      console.error('Failed to load language messages from API:', error)
    }
  }
})
