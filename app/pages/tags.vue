<script setup lang="ts">
import { getRandomGradient } from '../../lib/colors'

const tags = [
  { name: 'Nuxt', count: 15 },
  { name: 'Vue', count: 12 },
  { name: 'React', count: 8 },
  { name: 'TypeScript', count: 20 },
  { name: 'Node.js', count: 10 },
  { name: 'NestJS', count: 6 },
  { name: 'Tailwind', count: 9 },
  { name: 'CSS', count: 5 },
  { name: 'Design', count: 4 }
]
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8 border-b pb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-4">
        标签墙
      </h1>
      <p class="text-muted-foreground">
        通过标签探索相关话题。
      </p>
    </header>

    <div class="flex flex-wrap gap-4">
      <NuxtLink
        v-for="tag in tags"
        :key="tag.name"
        to="/tags"
        class="group flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm shadow-sm transition-opacity hover:opacity-90 text-white"
        :style="{ background: getRandomGradient() }"
      >
        <span
          class="i-lucide-tag text-white/80"
        />
        <span class="font-medium">{{
          tag.name
        }}</span>
        <span
          class="ml-1 text-xs text-white/90 bg-white/20 px-1.5 py-0.5 rounded-full"
        >{{ tag.count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
