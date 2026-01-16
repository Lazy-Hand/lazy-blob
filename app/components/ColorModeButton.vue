<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      @click="isDark = !isDark"
    >
      <span
        v-if="isDark"
        class="i-lucide-moon text-lg"
      />
      <span
        v-else
        class="i-lucide-sun text-lg"
      />
    </Button>
  </ClientOnly>
</template>
