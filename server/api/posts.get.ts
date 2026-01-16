import type { Post, ApiResponse, PaginatedResponse } from '~/types'
import { posts } from '../utils/data'

export default defineEventHandler(
  async (event): Promise<ApiResponse<PaginatedResponse<Post>>> => {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 6
    const categorySlug = query.category as string

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredPosts = posts
    if (categorySlug) {
      filteredPosts = posts.filter(post => post.category.slug === categorySlug)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    const total = filteredPosts.length

    return {
      code: 200,
      message: 'Success',
      data: {
        list: paginatedPosts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }
  }
)
