import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ContentForm } from './ContentForm'

export const ContentEditor: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id

  const onSaved = () => navigate('/admin/content')

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{isNew ? 'Create Content' : 'Edit Content'}</h2>
        <div />
      </div>

      <ContentForm contentId={isNew ? null : Number(id)} onSaved={onSaved} onClose={() => navigate('/admin/content')} />
    </div>
  )
}
