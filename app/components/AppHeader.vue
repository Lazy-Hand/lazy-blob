<script setup lang="ts">
const items = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '树洞', to: '/treehole' },
  { label: '摄影', to: '/photography' },
  { label: '色彩', to: '/colors' },
  { label: '友链', to: '/friends' },
  { label: '分类', to: '/categories' },
  { label: '归档', to: '/archives' },
  { label: '关于', to: '/about' }
]
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
          to="/"
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
            active-class="text-primary"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <!-- Mobile Menu (Placeholder) -->
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
        >
          <span class="i-lucide-menu text-xl" />
        </Button>
        <ColorModeButton />
      </div>
    </div>
  </header>
</template>
