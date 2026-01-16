<script setup lang="ts">
// Mock data for Friends
const friends = [
  {
    id: 1,
    name: 'Nuxt Labs',
    desc: 'The Intuitive Vue Framework.',
    avatar: 'https://avatars.githubusercontent.com/u/32131608?v=4',
    url: 'https://nuxt.com'
  },
  {
    id: 2,
    name: 'Vue.js',
    desc: 'The Progressive JavaScript Framework.',
    avatar: 'https://avatars.githubusercontent.com/u/6128107?v=4',
    url: 'https://vuejs.org'
  },
  {
    id: 3,
    name: 'Vite',
    desc: 'Next Generation Frontend Tooling.',
    avatar: 'https://avatars.githubusercontent.com/u/65625612?v=4',
    url: 'https://vitejs.dev'
  },
  {
    id: 4,
    name: 'Tailwind CSS',
    desc: 'Rapidly build modern websites without ever leaving your HTML.',
    avatar: 'https://avatars.githubusercontent.com/u/67109815?v=4',
    url: 'https://tailwindcss.com'
  },
  {
    id: 5,
    name: 'Anthony Fu',
    desc: 'A fanatical open sourceror.',
    avatar: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    url: 'https://antfu.me'
  }
]

useHead({
  title: '友链 - Friends'
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <header class="mb-10 text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-4">
        友链
      </h1>
      <p class="text-muted-foreground">
        海内存知己，天涯若比邻。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="friend in friends"
        :key="friend.id"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50"
      >
        <div class="h-14 w-14 rounded-full overflow-hidden border bg-muted shrink-0">
          <NuxtImg :src="friend.avatar" :alt="friend.name" class="h-full w-full object-cover transition-transform group-hover:scale-110" />
        </div>
        <div class="overflow-hidden">
          <h3 class="font-semibold group-hover:text-primary transition-colors truncate">
            {{ friend.name }}
          </h3>
          <p class="text-sm text-muted-foreground truncate">
            {{ friend.desc }}
          </p>
        </div>
      </a>
    </div>

    <!-- Apply Section -->
    <div class="mt-16 rounded-xl border border-dashed p-8 text-center bg-muted/30">
      <h3 class="text-xl font-semibold mb-2">
        申请友链
      </h3>
      <p class="text-muted-foreground mb-6 max-w-lg mx-auto">
        如果您想交换友链，请确保您的网站内容健康积极，且具有一定原创性。
      </p>
      <div class="text-sm text-left max-w-md mx-auto bg-card p-4 rounded-lg border">
        <p class="font-mono text-muted-foreground mb-1">
          name: Minimal Blog
        </p>
        <p class="font-mono text-muted-foreground mb-1">
          link: https://example.com
        </p>
        <p class="font-mono text-muted-foreground mb-1">
          desc: A minimalist space for sharing thoughts.
        </p>
        <p class="font-mono text-muted-foreground">
          avatar: https://example.com/avatar.png
        </p>
      </div>
    </div>
  </div>
</template>
