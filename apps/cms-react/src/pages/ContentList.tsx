import React, { useEffect, useState } from 'react'
import type { Content } from '@/types/api'
import { contentService } from '@/services/contentService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Link } from 'react-router-dom'
import { IconPlus, IconFileText, IconEdit, IconTrash } from '@tabler/icons-react'
import { SidePanel } from '@/components/SidePanel'
import { ContentForm } from './ContentForm'
import { showError } from '@/utils/toast'
export const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const openEditor = (id?: number | null) => { setEditingId(id ?? null); setPanelOpen(true) }
  const closeEditor = () => { setEditingId(null); setPanelOpen(false) }

  useEffect(() => { fetch() }, [])

  const fetch = async () => {
    try {
      setLoading(true)
      const data = await contentService.getAll()
      setContents(data)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete content?')) return
    try {
      await contentService.delete(id)
      fetch()
    } catch (e) {
      console.error(e)
      showError('Failed to delete')
    }
  }

  if (loading) return <Loading message="Loading contents..." />

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center"><IconFileText className="mr-2" />Contents</h2>
        <Button onClick={() => openEditor(null)}><IconPlus className="mr-2" />Create</Button>
      </div>

      <Card>
        {contents.length === 0 ? <p>No content found</p> : (
          <div className="space-y-3">
            {contents.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-gray-600">{c.slug} — {c.status}</div>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => openEditor(c.id)}><IconEdit className="mr-2" />Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}><IconTrash className="mr-2" />Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Side panel editor */}
      <SidePanel isOpen={panelOpen} onClose={closeEditor} title={editingId ? 'Edit Content' : 'Create Content'}>
        <ContentForm contentId={editingId} onSaved={() => { fetch(); closeEditor() }} onClose={closeEditor} />
      </SidePanel>
    </div>
  )
}
