# Inorta CMS - React Frontend

Modern React frontend for Inorta CMS with Tailwind CSS and theme switching.

## Features

- ✅ **React 18** - Modern React with hooks
- ✅ **Vite** - Lightning-fast development and builds
- ✅ **Tailwind CSS** - Utility-first CSS framework with custom theme
- ✅ **Tabler Icons** - 4000+ beautiful SVG icons
- ✅ **Theme Switching** - Easy dark/light mode toggle with class-based switching
- ✅ **React Router** - Client-side routing
- ✅ **Axios** - HTTP client for API integration
- ✅ **User Management** - Complete CRUD interface
- ✅ **Responsive Design** - Mobile-first approach

## Project Structure

```
cms-react/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Alert.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/            # React contexts
│   │   └── ThemeContext.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   ├── services/           # API services
│   │   ├── api.ts
│   │   └── userService.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.cjs
```

## Prerequisites

- Node.js 18+ and npm
- Backend API running on port 8000

## Quick Start

### 1. Install Dependencies

```bash
cd apps/cms-react
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` if needed:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Admin Routes

All administration pages live under the `/admin` path and are protected behind a minimal demo login:

- `/admin` - Dashboard (requires login)
- `/admin/users` - User management (CRUD)
- `/admin/settings` - Site settings

The root `/` redirects to `/admin`.

### Login (Development Demo)

A basic login page is available at `/login`. It accepts an email and stores a demo token in localStorage to simulate authentication. In Phase 2 we can replace this with real JWT authentication and protected routes tied to backend auth.

## Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint

## Theme System

### Easy Theme Switching

The app uses **class-based theme switching** for easy customization:

1. **Toggle Button**: Click the sun/moon icon in the navbar
2. **Persistent**: Theme preference saved to localStorage
3. **System Detection**: Automatically detects OS theme preference

### Theme Implementation

```jsx
// Using the theme context
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Customizing Colors

Edit `tailwind.config.js` to customize theme colors:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color shades
      },
      dark: {
        // Your dark theme colors
      },
    },
  },
}
```

### Using Theme Classes

Tailwind's dark mode is enabled with `class` strategy:

```jsx
// Light and dark variants
<div className="bg-white dark:bg-dark-100">
  <h1 className="text-gray-900 dark:text-dark-900">
    Title
  </h1>
</div>
```

## Components

### Reusable Components

All components support theme switching out of the box:

```jsx
// Card
<Card title="My Card">
  Content here
</Card>

// Button
<Button variant="primary">Click me</Button>
<Button variant="secondary" size="sm">Small</Button>

// Input
<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
/>

// Modal
<Modal isOpen={open} onClose={close} title="My Modal">
  Modal content
</Modal>

// Alert
<Alert type="success" message="Success!" />
```

### Icons

Using Tabler Icons is simple:

```jsx
import { IconUser, IconSettings } from '@tabler/icons-react'

<IconUser size={24} className="text-primary-600" />
```

Browse all icons: https://tabler-icons.io/

## API Integration

### Service Layer

API calls are handled through service modules:

```jsx
// Using the user service
import { userService } from '@/services/userService'

// Get all users
const users = await userService.getAll()

// Create user
const newUser = await userService.create({
  email: 'user@example.com',
  name: 'John Doe'
})

// Update user
await userService.update(userId, { name: 'Jane Doe' })

// Delete user
await userService.delete(userId)
```

### Adding New Services

Create a new service file in `src/services/`:

```js
import api from './api'

export const myService = {
  getAll: async () => {
    const response = await api.get('/api/myresource')
    return response.data
  },
  // Add more methods...
}
```

## Styling Guide

### Using Tailwind Classes

```jsx
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
// Theme-aware colors
<div className="bg-white dark:bg-dark-100 text-gray-900 dark:text-dark-900">
  
// Custom component classes (defined in index.css)
<div className="card">
  <button className="btn btn-primary">
```

### Adding Custom Styles

Add reusable component styles in `src/index.css`:

```css
@layer components {
  .my-component {
    @apply bg-white dark:bg-dark-100 rounded-lg p-4;
  }
}
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## Deployment

### Static Hosting

Deploy the `dist/` folder to any static host:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Customization Examples

### Change Primary Color

In `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#f0f9ff',
    // ... your color scale
    900: '#0c4a6e',
  },
}
```

### Add New Route

1. Create page component in `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`:

```jsx
<Route path="/mypage" element={<MyPage />} />
```

3. Add navigation link in `src/components/Navbar.tsx`

### Create Custom Theme

In `src/context/ThemeContext.tsx`, extend to support more themes:

```jsx
const [theme, setTheme] = useState('light') // or 'dark', 'blue', 'green'
```

## Phase 1 Checklist

- ✅ React app bootstrapped with Vite
- ✅ Tailwind CSS configured with custom theme
- ✅ Tabler Icons integrated
- ✅ Theme switching with class-based approach
- ✅ Responsive navigation
- ✅ User CRUD interface
- ✅ API integration with backend
- ✅ Reusable component library
- ✅ Dark mode support
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states

## Next Steps (Phase 2)

- [ ] Authentication UI
- [ ] Protected routes
- [ ] Advanced form handling (React Hook Form)
- [ ] Data tables with sorting/filtering
- [ ] Toast notifications
- [ ] File upload interface
- [ ] Rich text editor
- [ ] Drag and drop
- [ ] Charts and analytics
- [ ] Multi-language support

## Troubleshooting

### Port already in use

Change the port in `vite.config.js`:

```js
server: {
  port: 3001, // Change to any available port
}
```

### API connection errors

1. Ensure backend is running on port 8000
2. Check CORS settings in backend
3. Verify API URL in `.env`

### Theme not persisting

Clear localStorage and refresh:

```js
localStorage.clear()
location.reload()
```

## Contributing

This is part of the Inorta CMS monorepo. See main README for contribution guidelines.

## License

[Your License Here]
