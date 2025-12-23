#!/bin/bash
# Setup script for Inorta CMS React Frontend

set -e

echo "🚀 Setting up Inorta CMS React Frontend..."

# Check Node.js version
echo "📌 Checking Node.js version..."
node_version=$(node --version 2>&1 | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js 18 or higher is required. Current version: $(node --version)"
    exit 1
fi
echo "✓ Node.js $(node --version)"
echo "✓ npm $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
else
    echo "⚠️  .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Make sure the backend is running on http://localhost:8000"
echo "  2. Update .env if needed (default: VITE_API_URL=http://localhost:8000)"
echo "  3. Start the development server: npm run dev"
echo ""
echo "The app will be available at:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend API: http://localhost:8000"
echo "  - API Docs: http://localhost:8000/docs"
