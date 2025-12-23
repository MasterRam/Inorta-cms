import React, { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

type RichTextEditorProps = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value = '', onChange, placeholder = 'Start writing...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return <EditorContent editor={editor} className="prose max-w-none" />
}
