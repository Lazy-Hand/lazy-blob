<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date)
}
</script>

<template>
  <article
    class="group relative flex flex-col space-y-3 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
  >
    <!-- Cover Image -->
    <div
      class="aspect-video w-full overflow-hidden bg-muted"
    >
      <NuxtImg
        :src="post.coverImage || '/images/default-posts.avif'"
        :alt="post.title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col justify-between p-5">
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span class="text-primary font-medium">{{
            post.category?.name
          }}</span>
          <span>•</span>
          <time :datetime="post.createdAt">{{
            formatDate(post.createdAt)
          }}</time>
        </div>

        <h2
          class="text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors"
        >
          <NuxtLink :to="`/posts/${post.id}`">
            <span class="absolute inset-0 z-10" />
            {{ post.title }}
          </NuxtLink>
        </h2>

        <p class="text-sm text-muted-foreground line-clamp-3">
          {{ post.summary }}
        </p>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <div
          v-for="tag in post.tags"
          :key="tag.id"
          class="relative z-20"
        >
          <Badge
            variant="secondary"
            class="text-xs font-normal text-white"
          >
            #{{ tag.name }}
          </Badge>
        </div>
      </div>
    </div>
  </article>
</template>
