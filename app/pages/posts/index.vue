<script setup lang="ts">
const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)
const { fetchPosts } = useBlogApi()

// Watch page changes and refetch
const { data: posts, pending, pagination } = await fetchPosts(page.value)

watch(page, async (newPage) => {
  const { data: newPosts, pagination: newPagination } = await fetchPosts(
    newPage
  )
  posts.value = newPosts.value
  pagination.value = newPagination.value
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

useHead({
  title: '文章列表'
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
        Previous
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
        Next
      </Button>
    </div>
  </div>
</template>
