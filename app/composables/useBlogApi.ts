import type { Post, Category, ApiResponse, PaginatedResponse } from '~/types'

export const useBlogApi = () => {
  const fetchPosts = async (page = 1, limit = 6, category?: string) => {
    const { data, error, pending, refresh } = await useFetch<
      ApiResponse<PaginatedResponse<Post>>
    >('/api/posts', {
      query: { page, limit, category },
      watch: [ref(page), ref(category)]
    })

    return {
      data: computed(() => data.value?.data.list || []),
      pagination: computed(() => data.value?.data.pagination),
      error,
      pending,
      refresh
    }
  }

  const fetchPostById = async (id: string) => {
    const { data, error, pending } = await useFetch<ApiResponse<Post>>(
      `/api/posts/${id}`
    )
    return {
      data: computed(() => data.value?.data),
      error,
      pending
    }
  }

  const fetchCategories = async () => {
    const { data, error, pending } = await useFetch<ApiResponse<Category[]>>(
      '/api/categories'
    )
    return {
      data: computed(() => data.value?.data || []),
      error,
      pending
    }
  }

  return {
    fetchPosts,
    fetchPostById,
    fetchCategories
  }
}
