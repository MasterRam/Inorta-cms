import React from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-dark-200 hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <IconMoon size={20} className="text-gray-700 dark:text-dark-700" />
      ) : (
        <IconSun size={20} className="text-gray-700 dark:text-dark-700" />
      )}
    </button>
  )
}
