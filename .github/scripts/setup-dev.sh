#!/bin/bash
# Quick development setup script

set -e

echo "🚀 Setting up Agantic AI E2E Automation Development Environment"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Install dependencies
echo -e "${BLUE}1. Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# 2. Install Git hooks
echo -e "${BLUE}2. Installing Git hooks...${NC}"
bash .github/scripts/install-hooks.sh
echo -e "${GREEN}✓ Git hooks installed${NC}"
echo ""

# 3. Install Playwright browsers
echo -e "${BLUE}3. Installing Playwright browsers...${NC}"
npx playwright install
echo -e "${GREEN}✓ Playwright browsers installed${NC}"
echo ""

# 4. Setup environment
echo -e "${BLUE}4. Setting up environment variables...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  .env file created. Please configure it with your values.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# 5. Build project
echo -e "${BLUE}5. Building project...${NC}"
npm run build
echo -e "${GREEN}✓ Project built${NC}"
echo ""

echo -e "${GREEN}═════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Setup complete!${NC}"
echo -e "${GREEN}═════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "1. Create a new branch: bash .github/scripts/create-branch.sh"
echo "2. Make your changes"
echo "3. Run tests: npm test"
echo "4. Commit and push"
echo "5. Create a Pull Request"
echo ""
