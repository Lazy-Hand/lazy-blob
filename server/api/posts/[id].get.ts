import type { Post, ApiResponse } from '~/types'

// Reusing the same data source (in a real app this would be a DB)
const posts: Post[] = [
  {
    id: '1',
    title: '构建清新简约风格的 Nuxt 3 博客',
    slug: 'build-nuxt3-minimal-blog',
    summary: '本文详细介绍了如何使用 Nuxt 3、Tailwind CSS 和 Shadcn UI 从零构建一个高性能、设计感十足的个人博客系统。',
    content: `
# 构建清新简约风格的 Nuxt 3 博客

在当今繁杂的互联网世界中，一个清新简约的博客不仅能提供良好的阅读体验，更能体现博主的审美品味。本文将带你一步步构建这样一个博客。

## 技术栈选择

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn Vue / Nuxt UI
- **Icons**: Lucide Icons

## 核心设计理念

### 1. 留白 (Whitespace)
恰当的留白可以让内容“呼吸”，减少视觉压迫感。

### 2. 排版 (Typography)
选择易读的无衬线字体，配合舒适的行高和字间距。

\`\`\`css
.prose {
  line-height: 1.75;
  font-family: 'Inter', sans-serif;
}
\`\`\`

## 结语

简约不简单。
    `,
    coverImage: 'https://images.unsplash.com/photo-1499750310159-5b5f22693851?q=80&w=2000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [{ id: '1', name: 'Nuxt', slug: 'nuxt' }, { id: '2', name: 'Vue', slug: 'vue' }],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 1205
  },
  {
    id: '2',
    title: '深入理解 NestJS 依赖注入',
    slug: 'nestjs-dependency-injection',
    summary: '依赖注入 (DI) 是 NestJS 的核心特性之一。本文将深入剖析其工作原理及高级用法。',
    content: '# 深入理解 NestJS 依赖注入\n\nNestJS 基于 Angular 的设计哲学...',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '2', name: '后端架构', slug: 'backend' },
    tags: [{ id: '3', name: 'NestJS', slug: 'nestjs' }],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 850
  },
  {
    id: '3',
    title: '2025 年前端技术趋势展望',
    slug: 'frontend-trends-2025',
    summary: 'AI 辅助编程、Rust 工具链的普及、Server Actions... 让我们一起看看 2025 年的前端会有哪些变革。',
    content: '# 2025 前端趋势\n\n技术迭代从未停止...',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [{ id: '4', name: 'Trend', slug: 'trend' }],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 2300
  }
]

export default defineEventHandler(async (event): Promise<ApiResponse<Post | null>> => {
  const id = getRouterParam(event, 'id')

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))

  const post = posts.find(p => p.id === id)

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }

  return {
    code: 200,
    message: 'Success',
    data: post
  }
})
