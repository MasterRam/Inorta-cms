# Development Scripts for Inorta CMS

This directory contains helper scripts for development.

## Available Scripts

### Master Setup
```bash
./setup.sh
```
Sets up both backend and frontend in one command.

### Backend Scripts
```bash
cd apps/backend
./setup.sh                    # Setup backend
uvicorn inorta_backend.main:app --reload  # Run dev server
alembic revision --autogenerate -m "message"  # Create migration
alembic upgrade head          # Apply migrations
pytest                        # Run tests
```

### Frontend Scripts
```bash
cd apps/cms-react
./setup.sh        # Setup frontend
npm run dev       # Run dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter
```

## Quick Start Commands

### Development Mode
```bash
# Terminal 1 - Backend
cd apps/backend
uvicorn inorta_backend.main:app --reload --port 8000

# Terminal 2 - Frontend
cd apps/cms-react
npm run dev
```

### Production Build
```bash
# Backend
cd apps/backend
docker build -t inorta-backend .

# Frontend
cd apps/cms-react
npm run build
```

## Environment Configuration

### Backend (.env)
```env
DATABASE_URL=sqlite:///./dev.db
SECRET_KEY=your-secret-key
ENV=development
DEBUG=true
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## Ports

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs
