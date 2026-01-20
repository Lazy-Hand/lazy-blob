export interface Category {
  id: string
  name: string
  slug: string
  count?: number
  description?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface User {
  id: string
  name: string
  avatar: string
  bio?: string
}

export interface UserEntity {
  userId: string
  username: string
  nickname: string
  avatar: string
  email: string
  mobile: string
  status: string
  gender: string
  isBlog: string
}

export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  content: string // Markdown
  coverImage?: string
  createdAt: string
  updatedAt: string
  category: Category
  tags: Tag[]
  author: User
  views?: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  list: T[]
  pagination: Pagination
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface LoginDto {
  username: string
  password: string
}

export interface LoginResult {
  accessToken: string
}

export interface ApiResult {
  code: number
  msg: string
  success: boolean
}

export interface ApiResultWithData<T> extends ApiResult {
  data: T
}
