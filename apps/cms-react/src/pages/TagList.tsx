import React, { useEffect, useState } from 'react'
import type { Tag } from '@/types/api'
import { tagService } from '@/services/tagService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { showSuccess, showError } from '@/utils/toast'

export const TagList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setOpen] = useState(false)
  const [editing, setEditing] = useState<Tag | null>(null)
  const [name, setName] = useState('')

  useEffect(() => { fetchTags() }, [])

  const fetchTags = async () => {
    setLoading(true)
    try {
      const data = await tagService.getAll()
      setTags(data)
    } finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); setName(''); setOpen(true) }
  const openEdit = (t: Tag) => { setEditing(t); setName(t.name); setOpen(true) }

  const save = async () => {
    try {
      if (editing) {
        await tagService.update(editing.id, { name })
      } else {
        await tagService.create({ name })
      }
      setOpen(false)
      fetchTags()
    } catch (e) {
      showError('Failed to save')
    }
  }

  const remove = async (id:number) => {
    if (!confirm('Delete tag?')) return
    try {
      await tagService.delete(id)
      showSuccess('Tag deleted')
      fetchTags()
    } catch (e) { showError('Failed to delete') }
  }

  if (loading) return <Loading message="Loading tags..." />

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tags</h2>
        <Button onClick={openCreate}>Create</Button>
      </div>

      <Card>
        {tags.length === 0 ? <p>No tags</p> : (
          <div className="space-y-2">
            {tags.map(t => (
              <div key={t.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.name}</div>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => openEdit(t)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => remove(t.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title={editing ? 'Edit Tag' : 'Create Tag'}>
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
