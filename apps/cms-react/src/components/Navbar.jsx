import { Link, useLocation } from 'react-router-dom'
import { 
  IconLayoutDashboard, 
  IconUsers, 
  IconSettings,
  IconBrandReact 
} from '@tabler/icons-react'
import { ThemeToggle } from './ThemeToggle'

export const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: IconLayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: IconUsers, label: 'Users' },
    { path: '/settings', icon: IconSettings, label: 'Settings' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <IconBrandReact size={32} className="text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-dark-900">
                Inorta CMS
              </span>
            </div>

            {/* Navigation Links */}
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

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
