import React from 'react'
import { IconX } from '@tabler/icons-react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            aria-label="Close"
          >
            <IconX size={20} className="text-gray-500 dark:text-dark-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
