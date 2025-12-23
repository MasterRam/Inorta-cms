export interface Role {
  id: number
  name: string
  description?: string | null
  created_at?: string
  updated_at?: string
}

export interface Content {
  id: number
  title: string
  slug: string
  content?: string | null
  excerpt?: string | null
  author_id: number
  status?: 'draft' | 'published' | 'archived'
  content_type?: 'post' | 'page' | 'article'
  published_at?: string | null
  featured_image_id?: number | null
  featured_image?: Media | null
  categories?: Category[]
  tags?: Tag[]
  created_at?: string
  updated_at?: string
}

export interface RoleCreatePayload {
  name: string
  description?: string
}

export interface Category {
  id: number
  name: string
  description?: string | null
  created_at?: string
  updated_at?: string
}

export interface Tag {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

export interface ContentCreatePayload {
  title: string
  slug: string
  content?: string
  excerpt?: string
  author_id: number
  status?: 'draft' | 'published' | 'archived'
  content_type?: 'post' | 'page' | 'article'
  featured_image_id?: number | null
  category_ids?: number[]
  tag_ids?: number[]
}

export interface User {
  id: number
  email: string
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  is_active?: boolean
  roles?: Role[]
  created_at?: string
  updated_at?: string
}

export interface Media {
  id: number
  filename: string
  url: string
  mime_type?: string | null
  size?: number | null
  created_at?: string
  updated_at?: string
}

export interface UserCreatePayload {
  email: string
  name?: string
  password?: string
  first_name?: string
  last_name?: string
  role_ids?: number[]
}

export interface UserUpdatePayload {
  email?: string
  name?: string
  password?: string
  first_name?: string
  last_name?: string
  role_ids?: number[]
}
