import { api } from '@/services/api'
import type { Content, ContentCreatePayload } from '@/types/api'

export const contentService = {
  getAll: async (skip = 0, limit = 100): Promise<Content[]> => {
    const res = await api.get('/contents', { params: { skip, limit } })
    return res.data
  },
  getById: async (id: number): Promise<Content> => {
    const res = await api.get(`/contents/${id}`)
    return res.data
  },
  create: async (payload: ContentCreatePayload): Promise<Content> => {
    const res = await api.post('/contents', payload)
    return res.data
  },
  update: async (id: number, payload: Partial<ContentCreatePayload>): Promise<Content> => {
    const res = await api.put(`/contents/${id}`, payload)
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/contents/${id}`)
  },
}
