import { api } from '@/services/api'
import type { Media } from '@/types/api'

export const mediaService = {
  getAll: async (): Promise<Media[]> => {
    const res = await api.get('/media')
    return res.data
  },
  getById: async (id: number): Promise<Media> => {
    const res = await api.get(`/media/${id}`)
    return res.data
  },
  upload: async (file: File): Promise<Media> => {
    const form = new FormData()
    form.append('file', file)
    const res = await api.post('/media', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/media/${id}`)
  },
}
