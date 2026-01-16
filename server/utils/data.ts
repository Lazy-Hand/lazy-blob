import type { Post } from '~/types'

export const posts: Post[] = [
  {
    id: '1',
    title: '构建清新简约风格的 Nuxt 3 博客',
    slug: 'build-nuxt3-minimal-blog',
    summary:
      '本文详细介绍了如何使用 Nuxt 3、Tailwind CSS 和 Shadcn UI 从零构建一个高性能、设计感十足的个人博客系统。',
    content: `...`,
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [
      { id: '1', name: 'Nuxt', slug: 'nuxt' },
      { id: '2', name: 'Vue', slug: 'vue' }
    ],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 1205
  },
  {
    id: '2',
    title: '深入理解 NestJS 依赖注入',
    slug: 'nestjs-dependency-injection',
    summary:
      '依赖注入 (DI) 是 NestJS 的核心特性之一。本文将深入剖析其工作原理及高级用法。',
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
    summary:
      'AI 辅助编程、Rust 工具链的普及、Server Actions... 让我们一起看看 2025 年的前端会有哪些变革。',
    content: '# 2025 前端趋势\n\n技术迭代从未停止...',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [{ id: '4', name: 'Trend', slug: 'trend' }],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 2300
  },
  // Generate more dummy posts
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `${i + 4}`,
    title: `Mock Article ${i + 4} - Generated for Pagination Test`,
    slug: `mock-article-${i + 4}`,
    summary:
      'This is a mock article summary generated to test the pagination functionality of the blog system.',
    content: '# Mock Content',
    coverImage:
      i % 3 === 0
        ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop'
        : undefined,
    createdAt: new Date(Date.now() - 86400000 * (i + 10)).toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: '3', name: 'DevOps', slug: 'devops' },
    tags: [{ id: '5', name: 'Mock', slug: 'mock' }],
    author: { id: '1', name: 'Admin', avatar: '', bio: 'Full Stack Dev' },
    views: 100 + i * 10
  }))
]
