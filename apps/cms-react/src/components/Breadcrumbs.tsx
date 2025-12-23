import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const nameMap: Record<string, string> = {
  admin: 'Dashboard',
  users: 'Users',
  settings: 'Settings',
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)

  const items = parts.map((part, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/')
    const name = nameMap[part] || part.charAt(0).toUpperCase() + part.slice(1)
    return { name, to }
  })

  return (
    <nav className="text-sm text-gray-500 dark:text-dark-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((it, i) => (
          <li key={it.to} className="flex items-center">
            {i > 0 && <span className="mx-2">/</span>}
            <Link to={it.to} className="hover:underline">
              {it.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
