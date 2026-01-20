<script setup lang="ts">
const { isAuthenticated } = useAuth()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const items = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.posts'), to: localePath('/posts') },
  { label: t('nav.treehole'), to: localePath('/treehole') },
  { label: t('nav.photography'), to: localePath('/photography') },
  { label: t('nav.colors'), to: localePath('/colors') },
  { label: t('nav.friends'), to: localePath('/friends') },
  { label: t('nav.categories'), to: localePath('/categories') },
  { label: t('nav.archives'), to: localePath('/archives') },
  { label: t('nav.about'), to: localePath('/about') }
])

const isLinkActive = (to: string) => {
  const route = useRoute()
  const currentPath = route.path

  // Use localePath to normalize the comparison
  const normalizedTo = localePath(to)

  return currentPath === normalizedTo
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl shadow-sm"
  >
    <div
      class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8"
    >
      <div class="flex items-center gap-6">
        <NuxtLink
          :to="localePath('/')"
          class="block h-16 w-auto text-foreground"
        >
          <AppLogo class="h-full w-auto" />
        </NuxtLink>
        <nav class="hidden md:flex gap-6">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': isLinkActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <LanguageSwitcher />

        <NuxtLink
          v-if="!isAuthenticated"
          :to="localePath('/login')"
          class="text-sm font-medium transition-colors hover:text-primary"
          :class="{ 'text-primary': isLinkActive(localePath('/login')) }"
        >
          {{ t('auth.login') }}
        </NuxtLink>
        <UserDropdown v-else />

        <ColorModeButton />
      </div>
    </div>
  </header>
</template>
