<script setup lang="ts">
const { fetchCategories } = useBlogApi()
const { data: categories } = await fetchCategories()

useHead({
  title: '文章分类'
})
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
        :to="`/posts?category=${cat.slug}`"
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
          <Badge variant="secondary">{{ cat.count || 0 }} 篇</Badge>
        </div>
        <p class="text-sm text-muted-foreground">{{ cat.description || '暂无描述' }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
