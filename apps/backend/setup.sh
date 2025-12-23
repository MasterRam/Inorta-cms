#!/bin/bash
# Setup script for Inorta CMS Backend

set -e

echo "🚀 Setting up Inorta CMS Backend..."

# Check Python version
echo "📌 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📦 Installing dependencies..."
pip install -e .
pip install -e ".[dev]"

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created. Please update it with your configuration."
fi

# Initialize database
echo "🗄️  Initializing database..."
if [ ! -f "dev.db" ]; then
    python -c "from inorta_backend.db.session import init_db; init_db()"
    echo "✓ Database initialized"
else
    echo "⚠️  Database already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Activate the virtual environment: source venv/bin/activate"
echo "  2. Update .env with your configuration"
echo "  3. Run migrations: alembic upgrade head"
echo "  4. Start the server: uvicorn inorta_backend.main:app --reload"
echo ""
echo "API will be available at:"
echo "  - API: http://localhost:8000"
echo "  - Docs: http://localhost:8000/docs"
