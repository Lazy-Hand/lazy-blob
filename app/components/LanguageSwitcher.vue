<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const route = useRoute()

const isOpen = ref(false)

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

const changeLanguage = async (langCode: 'zh' | 'en') => {
  const currentPath = route.path

  let newPath = ''

  if (langCode === 'en') {
    if (!currentPath.startsWith('/en')) {
      newPath = `/en${currentPath}`
    } else {
      newPath = currentPath
    }
  } else {
    newPath = currentPath.replace(/^\/en/, '') || '/'
  }

  await setLocale(langCode)
  await navigateTo(newPath)

  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
      @click="isOpen = !isOpen"
    >
      <span class="i-lucide-languages text-lg" />
      <span class="hidden sm:inline">{{ currentLocale?.name }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-40 rounded-lg border bg-popover p-1 shadow-lg z-50"
    >
      <button
        v-for="loc in locales"
        :key="loc.code"
        class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 hover:bg-accent hover:translate-x-0.5 hover:shadow-sm active:translate-x-0"
        :class="{ 'bg-accent': loc.code === locale }"
        @click="changeLanguage(loc.code)"
      >
        <span>{{ loc.name }}</span>
        <span v-if="loc.code === locale" class="i-lucide-check text-primary ml-auto" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    />
  </div>
</template>
