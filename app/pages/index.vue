<script setup lang="ts">
const { fetchPosts } = useBlogApi()
const { data: posts, pending } = await fetchPosts()
</script>

<template>
  <div>
    <!-- Hero / Intro -->
    <section class="mb-12 py-8 text-center sm:text-left">
      <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Thinking & <span class="text-primary">Sharing</span>
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl">
        A minimalist space for sharing thoughts on frontend development, design
        systems, and software architecture.
      </p>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-8">
        <!-- Post List -->
        <div
          v-if="pending"
          class="space-y-6"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="h-64 w-full animate-pulse rounded-xl bg-muted/50"
          />
        </div>

        <div
          v-else
          class="space-y-8"
        >
          <ArticleCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="hidden lg:block lg:col-span-4">
        <AppSidebar />
      </aside>
    </div>
  </div>
</template>
