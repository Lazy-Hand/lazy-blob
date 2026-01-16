<script setup lang="ts">
import { getRandomGradient } from '../../lib/colors'

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
            Boke Author
          </h3>
          <p class="text-xs text-muted-foreground">
            Full Stack Developer
          </p>
        </div>
      </div>
      <p class="text-sm text-muted-foreground mb-4">
        专注于分享 Web 技术、架构设计与编程心得。
      </p>
      <div class="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          class="w-full"
        >
          Github
        </Button>
        <Button
          size="sm"
          variant="outline"
          class="w-full"
        >
          Twitter
        </Button>
      </div>
    </div>

    <!-- Categories -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 class="font-semibold mb-4 flex items-center gap-2">
        <span class="i-lucide-folder text-primary" /> 分类
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
        <span class="i-lucide-tag text-primary" /> 标签
      </h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag"
          to="/tags"
          class="text-xs px-2.5 py-1 rounded-md text-white transition-opacity hover:opacity-90 shadow-sm"
          :style="{ background: getRandomGradient() }"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
