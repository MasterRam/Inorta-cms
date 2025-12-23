import React, { useEffect, useState } from 'react'
import type { Media } from '@/types/api'
import { mediaService } from '@/services/mediaService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Modal } from '@/components/Modal'
import { MediaPicker } from '@/components/MediaPicker'
import { showSuccess, showError } from '@/utils/toast'

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => { fetchMedia() }, [])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const data = await mediaService.getAll()
      setMedia(data)
    } finally { setLoading(false) }
  }

  const handleUpload = async (file: File) => {
    try {
      await mediaService.upload(file)
      showSuccess('Upload successful')
      fetchMedia()
    } catch (e) { showError('Upload failed') }
  }

  const remove = async (id: number) => {
    if (!confirm('Delete media?')) return
    try {
      await mediaService.delete(id)
      showSuccess('Media deleted')
      fetchMedia()
    } catch (e) { showError('Failed to delete') }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Media Library</h2>
        <div className="space-x-2">
          <Button onClick={() => setOpen(true)}>Open Library</Button>
          <label className="btn btn-secondary cursor-pointer">
            Upload
            <input type="file" className="hidden" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
          </label>
        </div>
      </div>

      <Card>
        {loading ? <Loading message="Loading media..." /> : (
          media.length === 0 ? <p>No media uploaded</p> : (
            <div className="grid grid-cols-4 gap-3">
              {media.map(m => (
                <div key={m.id} className="border rounded overflow-hidden">
                  <img src={m.url} alt={m.filename} className="w-full h-36 object-cover" />
                  <div className="p-2 flex items-center justify-between">
                    <div className="text-sm truncate">{m.filename}</div>
                    <div className="space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(m.url)}>Copy</Button>
                      <Button size="sm" variant="danger" onClick={() => remove(m.id)}>Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </Card>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title="Media Library">
        <MediaPicker onChange={() => { setOpen(false); fetchMedia() }} />
      </Modal>
    </div>
  )
}
