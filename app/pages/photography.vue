<script setup lang="ts">
import type { Photo } from "../../types/photo";
import type { ApiResponse, PaginatedResponse } from "../../types";

// State
const photos = ref<Photo[]>([]);
const page = ref(1);
const limit = 9;
const hasMore = ref(true);
const pending = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

// Fetch function
const fetchPhotos = async () => {
  if (pending.value || !hasMore.value) return;

  pending.value = true;
  try {
    const { data } = await useFetch<ApiResponse<PaginatedResponse<Photo>>>(
      "/api/photos",
      {
        query: { page: page.value, limit },
      }
    );

    if (data.value?.data) {
      const newPhotos = data.value.data.list;
      if (newPhotos.length < limit) {
        hasMore.value = false;
      }

      if (page.value === 1) {
        photos.value = newPhotos;
      } else {
        photos.value.push(...newPhotos);
      }

      page.value++;
    }
  } catch (error) {
    console.error("Failed to fetch photos:", error);
  } finally {
    pending.value = false;
  }
};

// Initial load
await fetchPhotos();

// Infinite scroll using Intersection Observer
useIntersectionObserver(
  loadMoreTrigger,
  ([entity]) => {
    if (entity?.isIntersecting && hasMore.value && !pending.value) {
      fetchPhotos();
    }
  },
  { threshold: 0.1 }
);

useHead({
  title: "摄影 - Photography",
});
</script>

<template>
  <div>
    <header class="mb-10 text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-4">摄影</h1>
      <p class="text-muted-foreground">定格美好瞬间，分享眼中的世界。</p>
    </header>

    <!-- Waterfall Grid -->
    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="break-inside-avoid rounded-xl overflow-hidden group relative mb-6"
      >
        <div
          :style="{ aspectRatio: `${photo.width || 3}/${photo.height || 2}` }"
        >
          <NuxtImg
            :src="photo.src"
            :alt="photo.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div
          class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
        >
          <h3 class="text-white font-bold text-lg">
            {{ photo.title }}
          </h3>
          <p class="text-white/80 text-sm flex items-center gap-1">
            <span class="i-lucide-map-pin text-xs" /> {{ photo.location }}
          </p>
          <p class="text-white/60 text-xs mt-1">
            {{ new Date(photo.date).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Load More Trigger / Loading State -->
    <div ref="loadMoreTrigger" class="py-12 flex justify-center w-full">
      <div
        v-if="pending"
        class="flex flex-col items-center gap-2 text-muted-foreground animate-pulse"
      >
        <span class="i-lucide-loader-2 animate-spin text-2xl" />
        <span class="text-sm">Loading more moments...</span>
      </div>
      <div
        v-else-if="!hasMore && photos.length > 0"
        class="text-muted-foreground text-sm"
      >
        No more photos to explore.
      </div>
    </div>
  </div>
</template>
