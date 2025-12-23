import { api } from '@/services/api'
import type { Category } from '@/types/api'

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get('/categories')
    return res.data
  },
  getById: async (id: number): Promise<Category> => {
    const res = await api.get(`/categories/${id}`)
    return res.data
  },
  create: async (payload: { name: string; description?: string }): Promise<Category> => {
    const res = await api.post('/categories', payload)
    return res.data
  },
  update: async (id: number, payload: Partial<{ name: string; description?: string }>): Promise<Category> => {
    const res = await api.put(`/categories/${id}`, payload)
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },
}
