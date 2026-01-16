# 清新简约风格 Nuxt 3 个人博客构建计划

本计划旨在构建一个仿 `wp-boke.work` 风格的现代博客，前期使用 Mock 数据，核心架构设计将确保未来能无缝切换至 NestJS 后端。

建议继续使用@nuxt-ui和shadcn-nux两个UI组件库进行加速开发

<br />

## 阶段一：基础架构与设计系统 (Foundation & Design)

目标：确立“清新简约”的视觉基调，搭建可扩展的项目骨架。

1. **环境配置与依赖补充**

   * 安装 `@tailwindcss/typography` 插件，用于优雅地渲染文章详情页的 Markdown 内容。

   * 配置 Tailwind CSS v4 主题，定义“清新”色调（如：淡雅的背景色、高对比度的文字、柔和的主色调）。
2. **全局布局 (Layouts)**

   * 创建 `layouts/default.vue`：

     * **Header**：响应式导航栏，支持磨砂玻璃效果 (Backdrop blur)，包含 Logo、导航链接、主题切换（深色/浅色模式）。

     * **Footer**：极简页脚，展示版权与社交链接。

     * **Main**：内容区域，预留合适的左右留白（Container）。

## 阶段二：数据层与 Mock 体系 (Data Layer & Mock)

目标：通过适配器模式隔离数据源，为 NestJS 迁移做准备。

1. **类型定义 (TypeScript Interfaces)**

   * 在 `types/` 目录下定义核心模型：`Post` (文章), `Category` (分类), `Tag` (标签), `ApiResponse` (标准响应格式)。
2. **Mock API Server**

   * 利用 Nuxt Server Routes (`server/api/...`) 创建模拟接口。

   * 模拟真实的网络延迟 (Delay)，测试加载状态。

   * 提供文章列表、文章详情、分类列表的 Mock 数据。
3. **API 抽象层 (Composables)**

   * 封装 `composables/useBlogApi.ts`：

     * 统一管理数据获取逻辑。

     * 未来接入 NestJS 时，只需修改此文件的 Base URL 和 endpoint，无需改动 UI 组件。

## 阶段三：核心页面开发 (Core Features)

目标：实现博客的核心浏览功能。

1. **首页 (Home)**

   * **Hero Section**：简单的个人介绍或 Slogan 区域。

   * **文章列表**：使用卡片式设计 (`ArticleCard` 组件)，展示封面图（可选）、标题、摘要、发布时间、分类标签。

   * **侧边栏 (Sidebar)**（可选，视设计而定）：展示个人简介、热门标签、最新文章。
2. **文章详情页 (Post Detail)**

   * 动态路由 `pages/posts/[id].vue`。

   * **Markdown 渲染**：集成 `markdown-it` 或使用 Nuxt UI 的内容组件，配合 `prose` 类名实现优美的排版。

   * **目录 (TOC)**：悬浮式文章目录。
3. **分类与归档 (Archives)**

   * 简单的分类筛选页面或时间轴归档页面。

## 阶段四：交互与优化 (Polish)

1. **UI/UX 细节**

   * 添加页面切换过渡动画。

   * 按钮与链接的 Hover 交互效果。

   * Skeleton 骨架屏加载状态。
2. **SEO 基础**

   * 配置 `useHead`，动态设置标题与描述。

***

### 待确认事项

* 您是否希望保留 `wp-boke.work` 的双栏布局（左内容+右侧边栏），还是更倾向于现代的单栏居中阅读体验？(默认计划采用响应式：桌面端双栏/单栏可选，移动端单栏)。 保留

* Mock 数据是否需要包含 Markdown 格式的正文内容以测试渲染效果？(建议包含)。 包含

请审查以上计划，如有修改意见请告知，否则我将按此步骤开始开发。
