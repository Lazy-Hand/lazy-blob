<script setup lang="ts">
// Mock data
const categories = [
  {
    id: '1',
    name: '前端开发',
    count: 12,
    description: 'Vue, React, Angular, Nuxt, Next.js 等前端技术栈探讨。'
  },
  {
    id: '2',
    name: '后端架构',
    count: 8,
    description: 'Node.js, NestJS, Microservices, Database 设计等。'
  },
  {
    id: '3',
    name: 'DevOps',
    count: 5,
    description: 'CI/CD, Docker, Kubernetes, AWS, Vercel 部署实践。'
  },
  {
    id: '4',
    name: '生活随笔',
    count: 3,
    description: '除此之外的生活记录与思考。'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8 border-b pb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-4">
        分类
      </h1>
      <p class="text-muted-foreground">
        文章分类归档，方便查找感兴趣的内容。
      </p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        to="/categories"
        class="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="i-lucide-folder text-primary text-xl" />
            <h3
              class="font-semibold text-lg group-hover:text-primary transition-colors"
            >
              {{ cat.name }}
            </h3>
          </div>
          <Badge variant="secondary">{{ cat.count }} 篇</Badge>
        </div>
        <p class="text-sm text-muted-foreground">{{ cat.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
