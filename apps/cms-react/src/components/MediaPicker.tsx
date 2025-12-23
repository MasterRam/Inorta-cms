import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { mediaService } from '@/services/mediaService'
import type { Media } from '@/types/api'
import { Button } from './Button'
import { Loading } from './Loading'
import { Alert } from './Alert'
import { showSuccess, showError } from '@/utils/toast'

type Props = {
  selectedId?: number | null
  onChange: (id: number | null) => void
}

export const MediaPicker: React.FC<Props> = ({ selectedId = null, onChange }) => {
  const [isOpen, setOpen] = useState(false)
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const list = await mediaService.getAll()
      setMedia(list)
    } catch (e) {
      setError('Failed to load media')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    if (isOpen) load()
    if (selectedId) {
      // fetch single media for preview
      mediaService.getById(selectedId).then((m) => setMedia((prev) => [m, ...prev.filter(x => x.id !== m.id)])).catch(() => {})
    }
  }, [isOpen, selectedId])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const newMedia = await mediaService.upload(file)
      setMedia((m) => [newMedia, ...m])
      onChange(newMedia.id)
      showSuccess('Upload successful')
    } catch (e) {
      setError('Upload failed')
      showError('Upload failed')
    } finally { setUploading(false) }
  }

  return (
    <div>
      <div className="mb-3">
        {selectedId ? (
          <div className="flex items-center space-x-3">
            <img src={media.find(m => m.id === selectedId)?.url ?? ''} alt="selected" className="w-24 h-24 object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="space-x-2">
              <Button size="sm" onClick={() => setOpen(true)}>Change</Button>
              <Button size="sm" variant="secondary" onClick={() => onChange(null)}>Remove</Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setOpen(true)}>Choose image</Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title="Media Library">
        {error && <Alert type="error" message={error} />}
        <div className="mb-4">
          <label className="block mb-2">Upload</label>
          <input type="file" accept="image/*" onChange={handleUpload} />
          {uploading && <div className="mt-2">Uploading...</div>}
        </div>

        {loading ? (
          <Loading message="Loading media..." />
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {media.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => { onChange(m.id); setOpen(false) }}
                className={`border rounded overflow-hidden p-0 ${selectedId === m.id ? 'ring-2 ring-blue-400' : ''}`}
              >
                <img src={m.url} alt={m.filename} className="w-full h-24 object-cover" />
                <div className="p-2 text-sm">{m.filename}</div>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
