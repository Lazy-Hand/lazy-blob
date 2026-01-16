<script setup lang="ts">
// Mock data for Tree Hole
const thoughts = [
  {
    id: 1,
    content: 'Sometimes the best code is the code you don\'t write. Less is more.',
    date: '2026-01-15 14:30',
    mood: '🤔'
  },
  {
    id: 2,
    content: 'Just deployed the new version! Fingers crossed 🤞',
    date: '2026-01-14 09:15',
    mood: '🚀'
  },
  {
    id: 3,
    content: 'Coffee is turning into code. The transformation is complete.',
    date: '2026-01-12 23:45',
    mood: '☕'
  },
  {
    id: 4,
    content: 'Why does CSS Grid make everything so much easier? I love it.',
    date: '2026-01-10 16:20',
    mood: '🎨'
  },
  {
    id: 5,
    content: 'Refactoring legacy code is like archeology. You never know what you might find.',
    date: '2026-01-08 11:00',
    mood: '🏺'
  }
]

useHead({
  title: '树洞 - Tree Hole'
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <header class="mb-10 text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-4">
        树洞
      </h1>
      <p class="text-muted-foreground">
        碎碎念，记录瞬间的想法与心情。
      </p>
    </header>

    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      <div
        v-for="item in thoughts"
        :key="item.id"
        class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
      >
        <!-- Icon -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xl">
          {{ item.mood }}
        </div>
        
        <!-- Card -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <time class="font-mono text-xs text-muted-foreground">{{ item.date }}</time>
          </div>
          <p class="text-sm leading-relaxed">
            {{ item.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
