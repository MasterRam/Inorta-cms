#!/bin/bash
# Master setup script for Inorta CMS

set -e

echo "════════════════════════════════════════════════════════════════"
echo "   🚀 Inorta CMS - Complete Setup"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}❌ Python 3 is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Python $(python3 --version)"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node --version)"
echo -e "${GREEN}✓${NC} npm $(npm --version)"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "   📦 Backend Setup (FastAPI)"
echo "════════════════════════════════════════════════════════════════"
echo ""

cd apps/backend

# Backend setup
echo -e "${BLUE}Installing Python dependencies...${NC}"
pip install -e . -q

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating backend .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓${NC} Backend .env created"
else
    echo -e "${YELLOW}⚠️${NC}  Backend .env already exists"
fi

echo -e "${GREEN}✓${NC} Backend setup complete"
echo ""

cd ../..

echo "════════════════════════════════════════════════════════════════"
echo "   🎨 Frontend Setup (React)"
echo "════════════════════════════════════════════════════════════════"
echo ""

cd apps/cms-react

# Frontend setup
echo -e "${BLUE}Installing npm dependencies...${NC}"
npm install --silent

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating frontend .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓${NC} Frontend .env created"
else
    echo -e "${YELLOW}⚠️${NC}  Frontend .env already exists"
fi

echo -e "${GREEN}✓${NC} Frontend setup complete"
echo ""

cd ../..

echo "════════════════════════════════════════════════════════════════"
echo "   ✨ Setup Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📚 Next Steps:"
echo ""
echo "1️⃣  Start the Backend:"
echo "   cd apps/backend"
echo "   uvicorn inorta_backend.main:app --reload --port 8000"
echo ""
echo "2️⃣  Start the Frontend (in a new terminal):"
echo "   cd apps/cms-react"
echo "   npm run dev"
echo ""
echo "3️⃣  Access the Application:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "📖 Documentation:"
echo "   Backend:   apps/backend/README.md"
echo "   Frontend:  apps/cms-react/README.md"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
