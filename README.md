# Inorta CMS

Modern monorepo CMS project with FastAPI backend and React frontend.

## 🚀 Project Overview

Inorta CMS is a full-stack content management system built with:

- **Backend**: FastAPI (Python) with SQLAlchemy and MySQL support
- **Frontend**: React + Vite with Tailwind CSS and theme switching
- **Icons**: Tabler Icons (4000+ beautiful icons)
- **Styling**: Tailwind CSS with customizable dark/light themes

## 📁 Project Structure

```
Inorta-cms/
├── apps/
│   ├── backend/           # FastAPI backend
│   │   ├── src/
│   │   ├── alembic/       # Database migrations
│   │   ├── README.md
│   │   └── IMPLEMENTATION.md
│   └── cms-react/         # React frontend
│       ├── src/
│       ├── README.md
│       └── IMPLEMENTATION.md
├── application-instruction.md
└── README.md
```

## ✨ Features

### Backend (FastAPI)
- ✅ FastAPI with async support
- ✅ SQLAlchemy ORM with multi-database support
- ✅ MySQL, PostgreSQL, SQLite compatibility
- ✅ Alembic database migrations
- ✅ User CRUD API with validation
- ✅ Auto-generated API documentation
- ✅ CORS enabled for frontend integration

### Frontend (React)
- ✅ React 18 with Vite
- ✅ Tailwind CSS with custom theming
- ✅ Dark/Light mode switching (class-based)
- ✅ Tabler Icons integration
- ✅ User management interface (CRUD)
- ✅ Responsive design
- ✅ Form validation and error handling

## 🎨 Theme Switching

The frontend features an **easy theme switching system**:

- **Toggle Button**: Click sun/moon icon to switch themes
- **Persistent**: Theme saved to localStorage
- **System Detection**: Auto-detects OS preference
- **Customizable**: Easy color customization in Tailwind config

```jsx
// Simple theme toggle
const { theme, toggleTheme } = useTheme()
<button onClick={toggleTheme}>Toggle Theme</button>

// Style with theme awareness
<div className="bg-white dark:bg-dark-100 text-gray-900 dark:text-dark-900">
```

## 🚀 Quick Start

### Backend Setup

```bash
cd apps/backend

# Install dependencies
pip install -e .

# Configure environment
cp .env.example .env

# Run server
uvicorn inorta_backend.main:app --reload --port 8000
```

Backend available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd apps/cms-react

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run dev server
npm run dev
```

Frontend available at: http://localhost:3000

## 📚 Documentation

Detailed documentation for each component:

- [Backend README](apps/backend/README.md) - Setup and API documentation
- [Backend Implementation](apps/backend/IMPLEMENTATION.md) - Technical details
- [Frontend README](apps/cms-react/README.md) - Setup and usage guide
- [Frontend Implementation](apps/cms-react/IMPLEMENTATION.md) - Technical details
- [Application Instructions](application-instruction.md) - Phase breakdown

## 🛠️ Technology Stack

**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy 2.0
- Alembic
- Pydantic v2
- PyMySQL / AIOMySQL

**Frontend:**
- React 18
- Vite
- Tailwind CSS 3
- React Router 6
- Tabler Icons
- Axios

## 🎯 Phase 1 Completed ✅

### Backend Deliverables
- ✅ FastAPI project structure
- ✅ SQLAlchemy with MySQL support
- ✅ User model and schemas
- ✅ Complete CRUD API endpoints
- ✅ Database migrations
- ✅ Configuration management
- ✅ API documentation

### Frontend Deliverables
- ✅ React application with Vite
- ✅ Tailwind CSS with custom theme
- ✅ Theme switching (dark/light mode)
- ✅ Tabler Icons integration
- ✅ User management UI
- ✅ API integration
- ✅ Responsive design

## 📋 API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/{id}` - Get user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Health
- `GET /health` - Health check
- `GET /` - Service info

## 🎨 Customization

### Theme Colors

Edit `apps/cms-react/tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      dark: {
        // Your dark theme colors
      },
    },
  },
}
```

### Database Configuration

Edit `apps/backend/.env`:

```env
# MySQL
DATABASE_URL=mysql+pymysql://user:pass@localhost:3306/inorta_cms

# SQLite (default)
DATABASE_URL=sqlite:///./dev.db

# PostgreSQL
DATABASE_URL=postgresql://user:pass@localhost:5432/inorta_cms
```

## 🔄 Development Workflow

1. **Start Backend**: `cd apps/backend && uvicorn inorta_backend.main:app --reload`
2. **Start Frontend**: `cd apps/cms-react && npm run dev`
3. **Access Application**: 
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📦 Building for Production

### Backend
```bash
cd apps/backend
docker build -t inorta-backend .
docker run -p 8000:8000 --env-file .env inorta-backend
```

### Frontend
```bash
cd apps/cms-react
npm run build
# Deploy dist/ folder to static hosting
```

## 🧪 Testing

### Backend Tests
```bash
cd apps/backend
pip install -e ".[dev]"
pytest
```

### Frontend Tests
```bash
cd apps/cms-react
npm test
```

## 🚧 Phase 2 Roadmap

- [ ] Authentication & authorization (JWT)
- [ ] Additional entities (content, media, categories)
- [ ] File upload functionality
- [ ] Rich text editor
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] E2E testing
- [ ] Docker Compose setup
- [ ] CI/CD pipelines

## 📝 License

[Your License Here]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

[Your Contact Information]

---

**Status**: Phase 1 Complete ✅  
**Version**: 0.1.0  
**Last Updated**: December 2025