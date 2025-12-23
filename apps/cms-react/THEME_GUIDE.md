# 🎨 Theme Switching Guide

## Easy Theme System with Tailwind CSS

This guide explains how the **class-based theme switching** works in Inorta CMS.

## How It Works

### 1. Theme Context (State Management)

```jsx
// src/context/ThemeContext.jsx
const [theme, setTheme] = useState('light') // or 'dark'

// HTML element gets the theme class
<html class="light">  // or class="dark"
```

### 2. Tailwind Configuration

```js
// tailwind.config.js
darkMode: 'class',  // Enable class-based dark mode
```

### 3. Styling with Theme Variants

```jsx
// Any component
<div className="bg-white dark:bg-dark-100">
  <h1 className="text-gray-900 dark:text-dark-900">
    Title
  </h1>
</div>
```

## Quick Start

### Using Theme Toggle

```jsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  )
}
```

### The Toggle Button

```jsx
// components/ThemeToggle.jsx
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  )
}
```

## Customization

### 1. Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      // Light theme colors
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',  // Main primary color
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      // Dark theme colors
      dark: {
        50: '#18181b',   // Dark background
        100: '#27272a',  // Card background
        200: '#3f3f46',  // Border color
        300: '#52525b',
        400: '#71717a',
        500: '#a1a1aa',
        600: '#d4d4d8',
        700: '#e4e4e7',
        800: '#f4f4f5',
        900: '#fafafa',  // Dark text color
      },
    },
  },
}
```

### 2. Create Custom Component

```jsx
// components/MyCard.jsx
export const MyCard = ({ children, title }) => {
  return (
    <div className="bg-white dark:bg-dark-100 rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-900 mb-4">
          {title}
        </h3>
      )}
      <div className="text-gray-600 dark:text-dark-600">
        {children}
      </div>
    </div>
  )
}
```

### 3. Pre-built Component Classes

The project includes ready-to-use component classes:

```css
/* index.css */

/* Card */
.card {
  @apply bg-white dark:bg-dark-100 rounded-lg shadow-md p-6;
}

/* Buttons */
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600;
}

.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark-300;
}

/* Input */
.input {
  @apply bg-white dark:bg-dark-100 border-gray-300 dark:border-dark-200 text-gray-900 dark:text-dark-900;
}

/* Table */
.table-header {
  @apply bg-gray-50 dark:bg-dark-200;
}

.table-body {
  @apply bg-white dark:bg-dark-100;
}
```

## Common Patterns

### Background Colors
```jsx
<div className="bg-white dark:bg-dark-100">
<div className="bg-gray-50 dark:bg-dark-50">
<div className="bg-gray-100 dark:bg-dark-200">
```

### Text Colors
```jsx
<h1 className="text-gray-900 dark:text-dark-900">   {/* Headings */}
<p className="text-gray-600 dark:text-dark-600">    {/* Body text */}
<span className="text-gray-500 dark:text-dark-500"> {/* Muted text */}
```

### Border Colors
```jsx
<div className="border-gray-200 dark:border-dark-200">
<div className="border-gray-300 dark:border-dark-300">
```

### Hover States
```jsx
<button className="hover:bg-gray-100 dark:hover:bg-dark-200">
<a className="hover:text-primary-600 dark:hover:text-primary-400">
```

### Interactive Elements
```jsx
<button className="
  bg-primary-600 
  hover:bg-primary-700 
  focus:ring-primary-500
  dark:bg-primary-500 
  dark:hover:bg-primary-600
  dark:focus:ring-primary-400
">
  Click me
</button>
```

## Adding More Themes

### 1. Extend Theme Context

```jsx
// ThemeContext.jsx
const [theme, setTheme] = useState('light') // 'light', 'dark', 'blue', 'green'

useEffect(() => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark', 'blue', 'green')
  root.classList.add(theme)
}, [theme])
```

### 2. Add Theme Variants in Tailwind

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          // Blue theme colors
        },
        green: {
          // Green theme colors
        },
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('blue', '.blue &')
      addVariant('green', '.green &')
    })
  ],
}
```

### 3. Use Theme Variants

```jsx
<div className="
  bg-white 
  dark:bg-dark-100 
  blue:bg-blue-100 
  green:bg-green-100
">
```

## Theme Persistence

The theme is automatically saved to localStorage:

```jsx
// ThemeContext.jsx
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])

// Load on mount
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light'
})
```

## System Theme Detection

Automatically detect OS preference:

```jsx
const [theme, setTheme] = useState(() => {
  // Check localStorage first
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
})
```

## Real-World Examples

### Navbar with Theme
```jsx
<nav className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200">
  <div className="flex items-center justify-between">
    <h1 className="text-xl font-bold text-gray-900 dark:text-dark-900">
      My App
    </h1>
    <ThemeToggle />
  </div>
</nav>
```

### Card Component
```jsx
<div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-dark-200">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-900 mb-2">
    Card Title
  </h3>
  <p className="text-gray-600 dark:text-dark-600">
    Card content with proper theme support
  </p>
</div>
```

### Form Input
```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 dark:text-dark-700 mb-1">
    Email
  </label>
  <input
    type="email"
    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-200 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500"
  />
</div>
```

### Button Variants
```jsx
{/* Primary Button */}
<button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-md">
  Primary
</button>

{/* Secondary Button */}
<button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark-300 text-gray-900 dark:text-dark-900 rounded-md">
  Secondary
</button>

{/* Danger Button */}
<button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
  Delete
</button>
```

## Testing Themes

1. **Manual Testing**:
   - Open app in browser
   - Click theme toggle
   - Verify all elements change appropriately

2. **Check Contrast**:
   - Use browser DevTools
   - Check color contrast ratios
   - Ensure text is readable

3. **Test Persistence**:
   - Toggle theme
   - Refresh page
   - Theme should persist

## Tips & Best Practices

### ✅ Do's
- Always provide both light and dark variants
- Use semantic color names (primary, success, danger)
- Test in both themes regularly
- Use the pre-built component classes
- Keep colors consistent across components

### ❌ Don'ts
- Don't hardcode colors like `#3b82f6`
- Don't forget dark variants on new components
- Don't use too many color variations
- Don't mix color systems (stick to your palette)

## Color Reference

### Light Theme
- **Background**: `bg-white`, `bg-gray-50`, `bg-gray-100`
- **Text**: `text-gray-900`, `text-gray-600`, `text-gray-500`
- **Borders**: `border-gray-200`, `border-gray-300`
- **Primary**: `bg-primary-600`, `text-primary-600`

### Dark Theme
- **Background**: `dark:bg-dark-50`, `dark:bg-dark-100`, `dark:bg-dark-200`
- **Text**: `dark:text-dark-900`, `dark:text-dark-600`, `dark:text-dark-500`
- **Borders**: `dark:border-dark-200`, `dark:border-dark-300`
- **Primary**: `dark:bg-primary-500`, `dark:text-primary-500`

## Troubleshooting

### Theme not switching?
1. Check HTML element has class: `<html class="dark">`
2. Verify Tailwind config: `darkMode: 'class'`
3. Check theme context is wrapping app

### Colors look wrong?
1. Review `tailwind.config.js` color definitions
2. Check you're using `dark:` prefix
3. Verify CSS is being generated

### Theme not persisting?
1. Check localStorage in DevTools
2. Verify ThemeContext saves on change
3. Check initial state loads from localStorage

---

**That's it!** You now have a complete understanding of the theme system. Happy theming! 🎨
