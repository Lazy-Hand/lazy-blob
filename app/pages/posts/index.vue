<script setup lang="ts">
import type { Post, Pagination } from '~/types'

const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)
const category = computed(() => route.query.category as string | undefined)
const { fetchPosts, fetchCategories } = useBlogApi()

const { data: categories } = await fetchCategories()
const posts = ref<Post[]>([])
const pagination = ref<Pagination>()
const pending = ref(false)

const loadPosts = async () => {
  pending.value = true
  try {
    const { data, pagination: pag } = await fetchPosts(page.value, 6, category.value)
    if (data.value) {
      posts.value = data.value
    } else {
      posts.value = []
    }
    if (pag.value) pagination.value = pag.value
  } catch (e) {
    console.error('Load posts failed', e)
    posts.value = []
  } finally {
    pending.value = false
  }
}

// Ensure initial load happens even if category is undefined
onMounted(() => {
  if (posts.value.length === 0) {
    loadPosts()
  }
})

// Server-side prefetch
await loadPosts()

watch([page, category], loadPosts)

useHead({
  title: category.value ? `文章列表 - ${category.value}` : '文章列表'
})
</script>

<template>
  <div>
    <header class="mb-10 text-center max-w-2xl mx-auto">
      <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Explore <span class="text-primary">Ideas</span>
      </h1>
      <p class="text-lg text-muted-foreground">
        Discover stories, thinking, and expertise from writers on any topic.
      </p>

      <!-- Category Tabs -->
      <div class="mt-8 flex flex-wrap justify-center gap-2">
        <Button
          :variant="!category ? 'default' : 'outline'"
          size="sm"
          class="rounded-full"
          @click="navigateTo('/posts')"
        >
          全部
        </Button>
        <Button
          v-for="cat in categories"
          :key="cat.id"
          :variant="category === cat.slug ? 'default' : 'outline'"
          size="sm"
          class="rounded-full"
          @click="navigateTo({ query: { category: cat.slug } })"
        >
          {{ cat.name }}
          <span class="ml-1 text-xs opacity-70">({{ cat.count || 0 }})</span>
        </Button>
      </div>
    </header>

    <!-- Post Grid -->
    <div
      v-if="pending"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-96 w-full animate-pulse rounded-xl bg-muted/50"
      />
    </div>

    <div
      v-else
      class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ArticleCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="h-full"
      />
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination && pagination.totalPages > 1"
      class="mt-12 flex justify-center gap-2"
    >
      <Button
        variant="outline"
        :disabled="page <= 1"
        @click="navigateTo({ query: { ...route.query, page: page - 1 } })"
      >
        上一页
      </Button>

      <div class="flex items-center gap-2">
        <Button
          v-for="i in pagination.totalPages"
          :key="i"
          :variant="page === i ? 'default' : 'outline'"
          size="icon"
          @click="navigateTo({ query: { ...route.query, page: i } })"
        >
          {{ i }}
        </Button>
      </div>

      <Button
        variant="outline"
        :disabled="page >= pagination.totalPages"
        @click="navigateTo({ query: { ...route.query, page: page + 1 } })"
      >
        下一页
      </Button>
    </div>
  </div>
</template>
