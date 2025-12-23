import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconLayoutDashboard, IconUsers, IconSettings, IconBrandReact, IconFileText } from '@tabler/icons-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/context/AuthContext'

type NavbarProps = {
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()

  const navItems = [
    { path: '/admin', icon: IconLayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: IconUsers, label: 'Users' },
    { path: '/admin/settings', icon: IconSettings, label: 'Settings' },
  ]

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/') || (path === '/admin' && location.pathname === '/admin')

  return (
    <nav className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <IconBrandReact size={32} className="text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-dark-900">Inorta CMS</span>
            </div>

            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'text-primary-600 dark:text-primary-500 bg-primary-50 dark:bg-dark-200'
                        : 'text-gray-700 dark:text-dark-700 hover:text-gray-900 dark:hover:text-dark-900 hover:bg-gray-100 dark:hover:bg-dark-200'
                    }`}
                  >
                    <Icon size={20} className="mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleSidebar && onToggleSidebar()}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-dark-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Toggle menu"
              aria-expanded={isSidebarOpen ? 'true' : 'false'}
              aria-controls="mobile-sidebar"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-dark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <ThemeToggle />
            {isAuthenticated ? (
              <button onClick={logout} className="px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-dark-200">Logout</button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-md text-sm bg-primary-600 text-white">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
