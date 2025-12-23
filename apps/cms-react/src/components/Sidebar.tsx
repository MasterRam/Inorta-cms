import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconLayoutDashboard, IconUsers, IconSettings, IconMenu, IconX, IconFileText, IconTags, IconPhoto } from '@tabler/icons-react'

type SidebarProps = {
  isOpen?: boolean
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose = () => {} }) => {
  const navItems = [
    { path: '/admin', icon: IconLayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: IconUsers, label: 'Users' },
    { path: '/admin/content', icon: IconFileText, label: 'Content' },
    { path: '/admin/categories', icon: IconTags, label: 'Categories' },
    { path: '/admin/tags', icon: IconTags, label: 'Tags' },
    { path: '/admin/media', icon: IconPhoto, label: 'Media' },
    { path: '/admin/settings', icon: IconSettings, label: 'Settings' },
  ]

  const drawerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const prevActiveRef = useRef<Element | null>(null)

  useEffect(() => {
    const drawer = drawerRef.current
    if (!isOpen) {
      if (prevActiveRef.current && (prevActiveRef.current as HTMLElement).focus) {
        (prevActiveRef.current as HTMLElement).focus()
      }
      document.body.style.overflow = ''
      return
    }

    prevActiveRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    const handleKeyDown = (e: Event) => {
      const ke = e as KeyboardEvent
      if (ke.key === 'Escape') {
        ke.preventDefault()
        onClose && onClose()
      }

      if (ke.key === 'Tab' && drawer) {
        const focusable = drawer.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const focusableArr = Array.prototype.slice.call(focusable) as HTMLElement[]
        if (focusableArr.length === 0) return
        const first = focusableArr[0]
        const last = focusableArr[focusableArr.length - 1]

        if (ke.shiftKey) {
          if (document.activeElement === first) {
            ke.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            ke.preventDefault()
            first.focus()
          }
        }
      }
    }

    drawer?.addEventListener('keydown', handleKeyDown)

    return () => {
      drawer?.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      <aside className="w-64 hidden lg:block">
        <div className="sticky top-6">
          <div className="mb-6 px-3">
            <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-dark-900">
              <IconMenu size={20} className="mr-2 text-primary-600 dark:text-primary-500" />
              Admin
            </div>
          </div>

          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.path} to={item.path} className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 dark:text-dark-700 hover:bg-gray-100 dark:hover:bg-dark-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                  <Icon size={18} className="mr-3 text-primary-600 dark:text-primary-500" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-dark-100 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
        ref={drawerRef}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-200">
          <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-dark-900">
            <IconMenu size={20} className="mr-2 text-primary-600 dark:text-primary-500" />
            Admin
          </div>
          <button ref={closeButtonRef} onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Close menu">
            <IconX size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path} onClick={onClose} className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 dark:text-dark-700 hover:bg-gray-100 dark:hover:bg-dark-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                <Icon size={18} className="mr-3 text-primary-600 dark:text-primary-500" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
