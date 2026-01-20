<script setup lang="ts">
import { getGradientForTag } from '../../lib/colors'
const { t } = useI18n()

// Mock data for sidebar
const categories = [
  { name: '前端开发', count: 12 },
  { name: '后端架构', count: 8 },
  { name: 'DevOps', count: 5 },
  { name: '生活随笔', count: 3 }
]

const tags = ['Nuxt', 'Vue', 'NestJS', 'TypeScript', 'Tailwind']
</script>

<template>
  <div class="sticky top-24 space-y-6">
    <!-- Author Profile -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div class="flex items-center gap-4 mb-4">
        <div
          class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"
        >
          Me
        </div>
        <div>
          <h3 class="font-semibold">
            {{ t('sidebar.author') }}
          </h3>
          <p class="text-xs text-muted-foreground">
            {{ t('sidebar.role') }}
          </p>
        </div>
      </div>
      <p class="text-sm text-muted-foreground mb-4">
        {{ t('sidebar.bio') }}
      </p>
      <div class="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          class="w-full"
        >
          {{ t('sidebar.github') }}
        </Button>
        <Button
          size="sm"
          variant="outline"
          class="w-full"
        >
          {{ t('sidebar.twitter') }}
        </Button>
      </div>
    </div>

    <!-- Categories -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 class="font-semibold mb-4 flex items-center gap-2">
        <span class="i-lucide-folder text-primary" /> {{ t('sidebar.categories') }}
      </h3>
      <ul class="space-y-2">
        <li
          v-for="cat in categories"
          :key="cat.name"
        >
          <NuxtLink
            to="/categories"
            class="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>{{ cat.name }}</span>
            <span class="bg-muted px-2 py-0.5 rounded-full text-xs">{{
              cat.count
            }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Tags -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 class="font-semibold mb-4 flex items-center gap-2">
        <span class="i-lucide-tag text-primary" /> {{ t('sidebar.tags') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag"
          to="/tags"
          class="text-xs px-2.5 py-1 rounded-md text-white transition-opacity hover:opacity-90 shadow-sm"
          :style="{ background: getGradientForTag(tag) }"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
