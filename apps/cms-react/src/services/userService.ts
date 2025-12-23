import { api } from '@/services/api'
import type { User, UserCreatePayload } from '@/types/api'

export const userService = {
  getAll: async (skip = 0, limit = 100): Promise<User[]> => {
    const response = await api.get('/api/users', { params: { skip, limit } })
    return response.data
  },
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`)
    return response.data
  },
  create: async (userData: UserCreatePayload): Promise<User> => {
    const response = await api.post('/api/users', userData)
    return response.data
  },
  update: async (id: number, userData: Partial<UserCreatePayload>): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, userData)
    return response.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`)
  },
}
