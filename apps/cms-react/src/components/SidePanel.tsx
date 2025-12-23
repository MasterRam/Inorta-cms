import React, { useEffect, useRef } from 'react'

type SidePanelProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, title, children }) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeButtonRef.current?.focus(), 50)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel) {
        const focusable = panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const focusableArr = Array.prototype.slice.call(focusable) as HTMLElement[]
        if (focusableArr.length === 0) return
        const first = focusableArr[0]
        const last = focusableArr[focusableArr.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault(); last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault(); first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <aside className="ml-auto w-full md:w-3/5 lg:w-2/5 bg-white dark:bg-dark-100 shadow-xl h-full overflow-auto" ref={panelRef} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-200">
          <div className="text-lg font-semibold">{title}</div>
          <button ref={closeButtonRef} onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-200" aria-label="Close panel">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </aside>
    </div>
  )
}
