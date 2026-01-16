<script setup lang="ts">
import MarkdownIt from 'markdown-it'

const route = useRoute()
const { fetchPostById } = useBlogApi()
const {
  data: post,
  pending,
  error
} = await fetchPostById(route.params.id as string)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const renderedContent = computed(() => {
  if (!post.value) return ''
  return md.render(post.value.content)
})

useHead({
  title: post.value?.title,
  meta: [{ name: 'description', content: post.value?.summary }]
})
</script>

<template>
  <div>
    <div
      v-if="pending"
      class="space-y-4"
    >
      <div class="h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
      <div class="h-6 w-1/2 animate-pulse rounded-lg bg-muted" />
      <div class="h-96 w-full animate-pulse rounded-lg bg-muted" />
    </div>

    <div
      v-else-if="error || !post"
      class="py-12 text-center"
    >
      <h1 class="text-2xl font-bold">
        Post not found
      </h1>
      <NuxtLink
        to="/"
        class="text-primary hover:underline mt-4 block"
      >
        Back to Home
      </NuxtLink>
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <!-- Main Content -->
      <div class="lg:col-span-8">
        <article
          class="prose prose-zinc dark:prose-invert max-w-none lg:prose-lg"
        >
          <!-- Header -->
          <header class="not-prose mb-8 border-b pb-8">
            <div
              class="flex items-center gap-2 text-sm text-muted-foreground mb-4"
            >
              <span
                class="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {{ post.category.name }}
              </span>
              <span>•</span>
              <time>{{ new Date(post.createdAt).toLocaleDateString() }}</time>
              <span>•</span>
              <span>{{ post.views }} views</span>
            </div>

            <h1 class="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
              {{ post.title }}
            </h1>

            <p class="text-xl text-muted-foreground leading-relaxed">
              {{ post.summary }}
            </p>

            <div
              v-if="post.coverImage"
              class="mt-8 aspect-video w-full overflow-hidden rounded-xl border bg-muted"
            >
              <NuxtImg
                :src="post.coverImage"
                :alt="post.title"
                class="h-full w-full object-cover"
              />
            </div>
          </header>

          <!-- Content -->
          <div v-html="renderedContent" />

          <!-- Tags -->
          <footer class="not-prose mt-12 border-t pt-8">
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="tag in post.tags"
                :key="tag.id"
                variant="secondary"
              >
                #{{ tag.name }}
              </Badge>
            </div>
          </footer>
        </article>
      </div>

      <!-- Sidebar -->
      <aside class="hidden lg:block lg:col-span-4">
        <AppSidebar />
      </aside>
    </div>
  </div>
</template>
