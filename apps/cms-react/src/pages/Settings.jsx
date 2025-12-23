import { IconSettings, IconPalette, IconBell } from '@tabler/icons-react'
import { Card } from '@/components/Card'
import { useTheme } from '@/context/ThemeContext'

export const Settings = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-dark-600">
            Manage your application preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <div className="flex items-start">
              <IconPalette size={24} className="text-primary-600 dark:text-primary-500 mr-4 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-900 mb-2">
                  Theme Preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-600 mb-4">
                  Choose your preferred color theme
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                        : 'border-gray-300 dark:border-dark-200 hover:border-primary-400'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-dark-900">
                      Light
                    </span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                        : 'border-gray-300 dark:border-dark-200 hover:border-primary-400'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-dark-900">
                      Dark
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="flex items-start">
              <IconBell size={24} className="text-primary-600 dark:text-primary-500 mr-4 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-900 mb-2">
                  Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-600 mb-4">
                  Manage notification preferences (Coming soon)
                </p>
              </div>
            </div>
          </Card>

          {/* General Settings */}
          <Card>
            <div className="flex items-start">
              <IconSettings size={24} className="text-primary-600 dark:text-primary-500 mr-4 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-900 mb-2">
                  General
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-600">
                  Additional settings coming in Phase 2
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
