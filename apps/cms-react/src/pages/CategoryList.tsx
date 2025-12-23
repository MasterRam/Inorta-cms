import React, { useEffect, useState } from 'react'
import type { Category } from '@/types/api'
import { categoryService } from '@/services/categoryService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { showSuccess, showError } from '@/utils/toast'

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [name, setName] = useState('')

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); setName(''); setOpen(true) }
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setOpen(true) }

  const save = async () => {
    try {
      if (editing) {
        await categoryService.update(editing.id, { name, description: editing.description ?? undefined })
      } else {
        await categoryService.create({ name })
      }
      setOpen(false)
      fetchCategories()
    } catch (e) {
      showError('Failed to save')
    }
  }

  const remove = async (id:number) => {
    if (!confirm('Delete category?')) return
    try {
      await categoryService.delete(id)
      showSuccess('Category deleted')
      fetchCategories()
    } catch (e) { showError('Failed to delete') }
  }

  if (loading) return <Loading message="Loading categories..." />

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={openCreate}>Create</Button>
      </div>

      <Card>
        {categories.length === 0 ? <p>No categories</p> : (
          <div className="space-y-2">
            {categories.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  {c.description && <div className="text-sm text-gray-600">{c.description}</div>}
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => openEdit(c)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => remove(c.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title={editing ? 'Edit Category' : 'Create Category'}>
        <div className="mb-3">
          <label className="label">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={save}>{editing ? 'Save' : 'Create'}</Button>
        </div>
      </Modal>
    </div>
  )
}
