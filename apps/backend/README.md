# Inorta CMS Backend (FastAPI)

Python-based FastAPI backend for the Inorta CMS monorepo project.

## Features

- ✅ **FastAPI** - Modern, fast Python web framework
- ✅ **SQLAlchemy 2.0** - Powerful ORM with async support
- ✅ **Multi-Database Support** - MySQL, PostgreSQL, SQLite
- ✅ **Alembic Migrations** - Database version control
- ✅ **Pydantic v2** - Data validation and settings management
- ✅ **CRUD API** - Complete REST endpoints for User entity
- ✅ **CORS Enabled** - Ready for frontend integration

## Project Structure

```
apps/backend/
├── alembic/                 # Database migrations
│   ├── versions/           # Migration files
│   └── env.py             # Alembic environment
├── src/
│   └── inorta_backend/
│       ├── api/            # API routes
│       ├── core/           # Core config
│       ├── db/             # Database setup
│       ├── models/         # SQLAlchemy models
│       ├── schemas/        # Pydantic schemas
│       ├── services/       # Business logic
│       └── main.py         # Application entry
├── .env                    # Environment variables
├── .env.example           # Environment template
├── Dockerfile             # Docker configuration
└── pyproject.toml         # Dependencies
```

## Prerequisites

- Python 3.11+
- MySQL 8.0+ (or PostgreSQL/SQLite)

## Quick Start

### 1. Install Dependencies

```bash
cd apps/backend
pip install -e .
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your database settings:

```env
# For SQLite (quick start)
DATABASE_URL=sqlite:///./dev.db

# For MySQL
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/inorta_cms

# For PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/inorta_cms
```

### 3. Run Database Migrations

```bash
# Generate initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 4. Run the Server

```bash
# Development mode with auto-reload
uvicorn inorta_backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /health` - Health check endpoint
- `GET /` - Service information

### User Management
- `POST /api/users` - Create a new user
- `GET /api/users` - List all users (with pagination)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user

### Example Request

```bash
# Create a user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe"}'

# Get all users
curl http://localhost:8000/api/users
```

## Database Configuration

### MySQL Setup

1. Install MySQL client:
```bash
pip install pymysql
```

2. Create database:
```sql
CREATE DATABASE inorta_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Update `.env`:
```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/inorta_cms
```

### PostgreSQL Setup

1. Install PostgreSQL driver:
```bash
pip install psycopg2-binary
```

2. Update `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/inorta_cms
```

## Development

### Running Tests

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest
```

### Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View migration history
alembic history
```

### Code Quality

```bash
# Format code
black src/

# Lint code
ruff check src/

# Type checking
mypy src/
```

## Docker Support

```bash
# Build image
docker build -t inorta-backend .

# Run container
docker run -p 8000:8000 --env-file .env inorta-backend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENV` | Environment mode | `development` |
| `DEBUG` | Enable debug mode | `true` |
| `APP_NAME` | Application name | `Inorta CMS Backend` |
| `DATABASE_URL` | Database connection string | `sqlite:///./dev.db` |
| `SECRET_KEY` | Secret key for security | (required) |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration | `30` |

## Phase 1 Checklist

- ✅ FastAPI project skeleton
- ✅ SQLAlchemy configured for MySQL
- ✅ Multi-database support (MySQL, PostgreSQL, SQLite)
- ✅ User model with proper schema
- ✅ CRUD endpoints for User entity
- ✅ Database migrations with Alembic
- ✅ Environment configuration
- ✅ CORS middleware
- ✅ API documentation (auto-generated)

## Next Steps (Phase 2)

- [ ] Add authentication & authorization (JWT)
- [ ] Implement additional entities
- [ ] Add input validation and error handling
- [ ] Unit and integration tests
- [ ] API rate limiting
- [ ] Logging and monitoring
- [ ] Docker Compose setup

## Contributing

This is part of the Inorta CMS monorepo. See main README for contribution guidelines.

## License

[Your License Here]
