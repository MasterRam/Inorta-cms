import React, { useEffect, useState } from 'react'
import type { Content, ContentCreatePayload, Category, Tag } from '@/types/api'
import { contentService } from '@/services/contentService'
import { categoryService } from '@/services/categoryService'
import { tagService } from '@/services/tagService'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { RichTextEditor } from '@/components/RichTextEditor'
import { Loading } from '@/components/Loading'
import { Alert } from '@/components/Alert'
import { MediaPicker } from '@/components/MediaPicker'
import { showSuccess, showError } from '@/utils/toast'
type Props = {
  contentId?: number | null
  initial?: Partial<ContentCreatePayload>
  onSaved?: () => void
  onClose?: () => void
}

export const ContentForm: React.FC<Props> = ({ contentId = null, initial = {}, onSaved, onClose }) => {
  const [content, setContent] = useState<Partial<ContentCreatePayload>>({ title: '', slug: '', content: '', excerpt: '', author_id: 1, featured_image_id: null, ...initial })
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    categoryService.getAll().then(setCategories).catch(() => {})
    tagService.getAll().then(setTags).catch(() => {})
    if (contentId) loadContent(contentId)
  }, [contentId])

  const loadContent = async (id: number) => {
    setLoading(true)
    try {
      const data = await contentService.getById(id)
      setContent({
        title: data.title,
        slug: data.slug,
        content: data.content ?? '',
        excerpt: data.excerpt ?? '',
        author_id: data.author_id,
        status: data.status,
        content_type: data.content_type,
        featured_image_id: data.featured_image_id ?? null,
        category_ids: data.categories?.map((c: Category) => c.id) ?? [],
        tag_ids: data.tags?.map((t: Tag) => t.id) ?? [],
      })
    } catch (e) {
      setError('Failed to load content')
    } finally { setLoading(false) }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (contentId) {
        await contentService.update(contentId, content as Partial<ContentCreatePayload>)
        showSuccess('Content updated')
      } else {
        await contentService.create(content as ContentCreatePayload)
        showSuccess('Content created')
      }
      onSaved?.()
      onClose?.()
    } catch (e) {
      setError('Failed to save')
      showError('Failed to save content')
    } finally { setLoading(false) }
  }

  if (loading) return <Loading message="Loading..." />

  return (
    <form onSubmit={submit}>
      {error && <Alert type="error" message={error} />}
      <Input label="Title" value={content.title || ''} onChange={(e) => setContent({ ...content, title: e.target.value })} />
      <Input label="Slug" value={content.slug || ''} onChange={(e) => setContent({ ...content, slug: e.target.value })} />

      <div className="mb-4">
        <label className="label">Categories</label>
        <select multiple value={(content.category_ids || []).map(String)} onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value))
          setContent({ ...content, category_ids: selected })
        }} className="input h-32">
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label className="label">Tags</label>
        <select multiple value={(content.tag_ids || []).map(String)} onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value))
          setContent({ ...content, tag_ids: selected })
        }} className="input h-32">
          {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label className="label">Featured Image</label>
        <MediaPicker selectedId={content.featured_image_id ?? undefined} onChange={(id) => setContent({ ...content, featured_image_id: id ?? null })} />
      </div>

      <div className="mb-4">
        <label className="label">Excerpt</label>
        <textarea className="input" value={content.excerpt || ''} onChange={(e) => setContent({ ...content, excerpt: e.target.value })} />
      </div>

      <div className="mb-4">
        <label className="label">Content</label>
        <RichTextEditor value={content.content as string} onChange={(html) => setContent({ ...content, content: html })} />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" type="button" onClick={() => onClose?.()}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
