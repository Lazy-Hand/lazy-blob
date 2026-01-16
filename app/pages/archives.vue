<script setup lang="ts">
// Mock data
const archives = [
  { year: 2025, posts: [
    { id: '3', title: '2025 年前端技术趋势展望', date: '01-10' }
  ] },
  { year: 2024, posts: [
    { id: '2', title: '深入理解 NestJS 依赖注入', date: '12-28' },
    { id: '1', title: '构建清新简约风格的 Nuxt 3 博客', date: '12-15' }
  ] }
]
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <header class="mb-8 border-b pb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-4">
        归档
      </h1>
      <p class="text-muted-foreground">
        按照时间线回顾过去的文章。
      </p>
    </header>

    <div class="space-y-12">
      <div
        v-for="group in archives"
        :key="group.year"
      >
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <span class="i-lucide-calendar text-primary" />
          {{ group.year }}
        </h2>
        <div class="relative border-l border-border ml-3 space-y-8 pb-4">
          <div
            v-for="post in group.posts"
            :key="post.id"
            class="ml-6 relative"
          >
            <div class="absolute -left-[31px] mt-1.5 h-4 w-4 rounded-full border border-border bg-background" />
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span class="text-sm text-muted-foreground font-mono">{{ post.date }}</span>
              <NuxtLink
                :to="`/posts/${post.id}`"
                class="text-lg font-medium hover:text-primary transition-colors"
              >
                {{ post.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
