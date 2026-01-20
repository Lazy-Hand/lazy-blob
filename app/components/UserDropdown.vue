<script setup lang="ts">
const { displayName, userAvatar, logout, userInfo } = useAuth()
const { t } = useI18n()
const isOpen = ref(false)

const handleProfile = () => {
  isOpen.value = false
  navigateTo('/profile')
}

const handleLogout = async () => {
  await logout()
  isOpen.value = false
}
</script>

<template>
  <ClientOnly>
    <div class="relative">
      <button
        class="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        @click="isOpen = !isOpen"
      >
        <img
          :src="userAvatar"
          :alt="displayName"
          class="h-9 w-9 rounded-full border-2 border-border"
        >
      </button>

      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-popover p-1 shadow-lg z-50"
      >
        <div class="px-3 py-2 border-b mb-1">
          <p class="text-sm font-medium">
            {{ displayName }}
          </p>
          <p v-if="userInfo" class="text-xs text-muted-foreground">
            {{ userInfo.email }}
          </p>
        </div>

        <button
          class="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 hover:bg-accent hover:translate-x-0.5 hover:shadow-sm active:translate-x-0"
          @click="handleProfile"
        >
          <span class="i-lucide-user text-muted-foreground transition-colors group-hover:text-foreground" />
          <span class="transition-colors">{{ t('user.profileLink') }}</span>
        </button>

        <button
          class="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:translate-x-0.5 hover:shadow-sm active:translate-x-0"
          @click="handleLogout"
        >
          <span class="i-lucide-log-out text-muted-foreground transition-colors hover:text-destructive" />
          <span class="transition-colors">{{ t('user.logout') }}</span>
        </button>
      </div>

      <div
        v-if="isOpen"
        class="fixed inset-0 z-40"
        @click="isOpen = false"
      />
    </div>
  </ClientOnly>
</template>
