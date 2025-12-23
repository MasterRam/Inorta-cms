import React, { useEffect, useState } from 'react'
import type { Role } from '@/types/api'
import { rolesService } from '@/services/rolesService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { Alert } from '@/components/Alert'
import { Loading } from '@/components/Loading'
import { getErrorMessage } from '@/utils/errors'
export const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [form, setForm] = useState<{ name: string; description?: string }>({ name: '', description: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState('')

  useEffect(() => { fetchRoles() }, [])

  const fetchRoles = async () => {
    try { setLoading(true); setError(null); const data = await rolesService.getAll(); setRoles(data) } catch (e) { setError('Failed to load roles') } finally { setLoading(false) }
  }

  const openModal = (role: Role | null = null) => {
    setEditing(role)
    setForm(role ? { name: role.name, description: role.description || '' } : { name: '', description: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => { setIsModalOpen(false); setEditing(null); setForm({ name: '', description: '' }) }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (editing) {
        await rolesService.update(editing.id, form)
        setSuccess('Role updated')
      } else {
        await rolesService.create(form)
        setSuccess('Role created')
      }
      closeModal()
      fetchRoles()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to save role')
      setError(msg)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete role?')) return
    try { await rolesService.delete(id); setSuccess('Role deleted'); fetchRoles(); setTimeout(() => setSuccess(''), 3000) } catch (e) { setError('Failed to delete') }
  }

  if (loading) return <Loading message="Loading roles..." />

  return (
    <div>
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Roles</h2>
        <Button onClick={() => openModal()}>Create Role</Button>
      </div>

      <Card>
        {roles.length === 0 ? <p>No roles found</p> : (
          <div className="space-y-2">
            {roles.map(r => (
              <div key={r.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.description}</div>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => openModal(r)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Role' : 'Create Role'}>
        <form onSubmit={submit}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
