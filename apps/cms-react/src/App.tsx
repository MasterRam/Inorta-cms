import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { Dashboard } from '@/pages/Dashboard'
import { Users } from '@/pages/Users'
import { Settings } from '@/pages/Settings'
import { ContentList } from '@/pages/ContentList'
import { ContentEditor } from '@/pages/ContentEditor'
import { CategoryList } from '@/pages/CategoryList'
import { TagList } from '@/pages/TagList'
import { MediaLibrary } from '@/pages/MediaLibrary'
import { AdminLayout } from '@/components/AdminLayout'
import { Login } from '@/pages/Login'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import '@/index.css'
import { Toaster } from 'react-hot-toast'

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-50">
        <main className="pb-8">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="content" element={<ContentList />} />
              <Route path="content/:id" element={<ContentEditor />} />
              <Route path="content/new" element={<ContentEditor />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="tags" element={<TagList />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
