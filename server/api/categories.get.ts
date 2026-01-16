import { posts } from '../utils/data'
import type { ApiResponse, Category } from '~/types'

export default defineEventHandler(async (): Promise<ApiResponse<Category[]>> => {
  // Extract categories and count posts
  const categoryMap = new Map<string, Category>()

  posts.forEach((post) => {
    const { id, name, slug } = post.category
    if (!categoryMap.has(id)) {
      categoryMap.set(id, { id, name, slug, count: 0 })
    }
    const cat = categoryMap.get(id)!
    cat.count = (cat.count || 0) + 1
  })

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return {
    code: 200,
    message: 'Success',
    data: Array.from(categoryMap.values())
  }
})
