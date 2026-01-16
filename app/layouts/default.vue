<template>
  <div class="min-h-screen bg-background font-sans antialiased flex flex-col">
    <AppHeader />

    <main class="flex-1 py-8">
      <div class="container mx-auto px-4 sm:px-8">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
