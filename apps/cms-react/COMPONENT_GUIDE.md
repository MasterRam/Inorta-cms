# 🎨 Visual Component Guide

Quick visual reference for using components in Inorta CMS.

## Theme Toggle

```jsx
import { ThemeToggle } from '@/components/ThemeToggle'

// In your component
<ThemeToggle />
```

**Renders**: Sun/moon button that toggles theme

---

## Navbar

```jsx
import { Navbar } from '@/components/Navbar'

<Navbar />
```

**Features**:
- Logo and app name
- Navigation links (Dashboard, Users, Settings)
- Active state highlighting
- Theme toggle button

---

## Card

```jsx
import { Card } from '@/components/Card'

<Card title="My Card">
  <p>Card content goes here</p>
</Card>

// Or without title
<Card>
  <p>Simple card</p>
</Card>
```

**Renders**: White card (light) / Dark card (dark) with rounded corners and shadow

---

## Button

```jsx
import { Button } from '@/components/Button'

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button size="sm">Small</Button>
```

**Variants**: primary (blue), secondary (gray), danger (red)  
**Sizes**: sm, md (default)

---

## Input

```jsx
import { Input } from '@/components/Input'

<Input 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter email"
  error={emailError}
/>
```

**Features**:
- Label
- Error message display
- Full theme support

---

## Modal

```jsx
import { Modal } from '@/components/Modal'

const [isOpen, setIsOpen] = useState(false)

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="My Modal"
>
  <p>Modal content</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>
```

**Features**:
- Overlay with backdrop
- Close button (X)
- Click outside to close
- Centered on screen

---

## Alert

```jsx
import { Alert } from '@/components/Alert'

<Alert type="success" message="Operation successful!" />
<Alert type="error" message="Something went wrong" />
<Alert type="info" message="Information message" />

// With close button
<Alert 
  type="success" 
  message="Saved!" 
  onClose={() => setAlert(null)}
/>
```

**Types**: success (green), error (red), info (blue)

---

## Loading

```jsx
import { Loading } from '@/components/Loading'

{loading && <Loading message="Loading data..." />}

// Or without message
{loading && <Loading />}
```

**Renders**: Spinning loader icon with optional message

---

## Complete Page Example

```jsx
import { useState, useEffect } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
import { Alert } from '@/components/Alert'
import { Loading } from '@/components/Loading'

export const MyPage = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [alert, setAlert] = useState(null)
  const [formData, setFormData] = useState({ name: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save logic
    setAlert({ type: 'success', message: 'Saved!' })
    setIsModalOpen(false)
  }

  if (loading) {
    return <Loading message="Loading..." />
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-900">
            My Page
          </h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Item
          </Button>
        </div>

        {/* Alert */}
        {alert && (
          <Alert 
            type={alert.type} 
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Content */}
        <Card title="Items">
          {items.length === 0 ? (
            <p className="text-gray-600 dark:text-dark-600">
              No items yet
            </p>
          ) : (
            <ul>
              {items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </Card>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Item"
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              placeholder="Enter name"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}
```

---

## Tabler Icons Usage

```jsx
import { 
  IconUser, 
  IconSettings, 
  IconTrash,
  IconEdit,
  IconPlus,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconLoader
} from '@tabler/icons-react'

// Basic usage
<IconUser size={24} />

// With Tailwind classes
<IconSettings 
  size={20} 
  className="text-primary-600 dark:text-primary-500" 
/>

// In button
<button>
  <IconPlus size={20} className="mr-2" />
  Add User
</button>
```

**Browse all icons**: https://tabler-icons.io/

---

## Theme-Aware Styling

```jsx
// Backgrounds
<div className="bg-white dark:bg-dark-100">
<div className="bg-gray-50 dark:bg-dark-50">

// Text
<h1 className="text-gray-900 dark:text-dark-900">
<p className="text-gray-600 dark:text-dark-600">

// Borders
<div className="border border-gray-200 dark:border-dark-200">

// Buttons
<button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">

// Hover states
<a className="hover:bg-gray-100 dark:hover:bg-dark-200">
```

---

## Form Example

```jsx
<form onSubmit={handleSubmit} className="space-y-4">
  <Input
    label="Email *"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={errors.email}
    placeholder="user@example.com"
  />
  
  <Input
    label="Name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="John Doe"
  />
  
  <div className="flex justify-end space-x-3">
    <Button type="button" variant="secondary" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit">
      Save
    </Button>
  </div>
</form>
```

---

## Table Example

```jsx
<div className="overflow-x-auto">
  <table className="table">
    <thead className="table-header">
      <tr>
        <th className="table-header-cell">ID</th>
        <th className="table-header-cell">Name</th>
        <th className="table-header-cell">Actions</th>
      </tr>
    </thead>
    <tbody className="table-body">
      {items.map((item) => (
        <tr key={item.id}>
          <td className="table-cell">{item.id}</td>
          <td className="table-cell">{item.name}</td>
          <td className="table-cell">
            <button onClick={() => handleEdit(item)}>
              <IconEdit size={18} />
            </button>
            <button onClick={() => handleDelete(item.id)}>
              <IconTrash size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card title="Card 1">Content</Card>
  <Card title="Card 2">Content</Card>
  <Card title="Card 3">Content</Card>
</div>
```

**Breakpoints**:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

---

## Layout Example

```jsx
export const MyLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-50">
      <Navbar />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

---

## Common Patterns

### List with Empty State
```jsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <IconAlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
    <p className="text-gray-600 dark:text-dark-600">
      No items found
    </p>
  </div>
) : (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)}
```

### Loading State
```jsx
{loading ? (
  <Loading message="Loading..." />
) : (
  <div>Content</div>
)}
```

### Error State
```jsx
{error && (
  <Alert 
    type="error" 
    message={error}
    onClose={() => setError(null)}
  />
)}
```

---

## Pro Tips

### 1. Always provide dark variants
```jsx
// ✅ Good
<div className="bg-white dark:bg-dark-100">

// ❌ Bad
<div className="bg-white">
```

### 2. Use semantic colors
```jsx
// ✅ Good
<Button variant="primary">

// ❌ Bad
<button className="bg-blue-600">
```

### 3. Responsive design
```jsx
// ✅ Good
<div className="grid grid-cols-1 md:grid-cols-2">

// ❌ Bad
<div className="grid grid-cols-2">
```

### 4. Icon sizing consistency
```jsx
// Navigation icons
<Icon size={20} />

// Page headers
<Icon size={24} />

// Large features
<Icon size={48} />
```

---

**That's everything you need!** 🎉

Use this guide as a quick reference when building new features.
