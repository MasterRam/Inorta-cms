import { api } from '@/services/api'
import type { Tag } from '@/types/api'

export const tagService = {
  getAll: async (): Promise<Tag[]> => {
    const res = await api.get('/tags')
    return res.data
  },
  getById: async (id: number): Promise<Tag> => {
    const res = await api.get(`/tags/${id}`)
    return res.data
  },
  create: async (payload: { name: string }): Promise<Tag> => {
    const res = await api.post('/tags', payload)
    return res.data
  },
  update: async (id: number, payload: Partial<{ name: string }>): Promise<Tag> => {
    const res = await api.put(`/tags/${id}`, payload)
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tags/${id}`)
  },
}
