import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Breadcrumbs } from './Breadcrumbs'
import { PageHeader } from './PageHeader'

const titleMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
}

export const AdminLayout: React.FC = () => {
  const location = useLocation()
  const title = titleMap[location.pathname] || 'Admin'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((s) => !s)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:space-x-6">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {isSidebarOpen && (
              <div onClick={closeSidebar} className="fixed inset-0 z-30 bg-black bg-opacity-40 lg:hidden" />
            )}

            <div className="flex-1">
              <Breadcrumbs />
              <PageHeader title={title} />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
