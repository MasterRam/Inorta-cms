import { api } from './api'
import type { Role, RoleCreatePayload } from '@/types/api'

export const rolesService = {
  getAll: async (skip = 0, limit = 100): Promise<Role[]> => {
    const res = await api.get('/roles', { params: { skip, limit } })
    return res.data
  },
  getById: async (id: number): Promise<Role> => {
    const res = await api.get(`/roles/${id}`)
    return res.data
  },
  create: async (payload: RoleCreatePayload): Promise<Role> => {
    const res = await api.post('/roles', payload)
    return res.data
  },
  update: async (id: number, payload: Partial<RoleCreatePayload>): Promise<Role> => {
    const res = await api.put(`/roles/${id}`, payload)
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/roles/${id}`)
  },
}
