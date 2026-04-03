#!/bin/bash
# Git Branching Helper - Creates feature/bugfix/chore branches with descriptions

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}       Agantic AI E2E Automation - Branch Creator${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}Current branch:${NC} $CURRENT_BRANCH"
echo ""

# Branch type selection
echo -e "${BLUE}Select branch type:${NC}"
echo "1) feature  - New feature or functionality"
echo "2) bugfix   - Bug fix"
echo "3) hotfix   - Critical production fix"
echo "4) chore    - Maintenance, dependencies, config"
echo "5) docs     - Documentation updates"
echo "6) test     - Test additions or updates"
echo "7) refactor - Code refactoring"
echo "8) perf     - Performance improvements"
echo ""

read -p "Enter choice (1-8): " TYPE_CHOICE

case $TYPE_CHOICE in
    1) BRANCH_TYPE="feature" ;;
    2) BRANCH_TYPE="bugfix" ;;
    3) BRANCH_TYPE="hotfix" ;;
    4) BRANCH_TYPE="chore" ;;
    5) BRANCH_TYPE="docs" ;;
    6) BRANCH_TYPE="test" ;;
    7) BRANCH_TYPE="refactor" ;;
    8) BRANCH_TYPE="perf" ;;
    *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
esac

echo ""
read -p "Enter short description (e.g., 'add-login-tests'): " DESCRIPTION

# Validate description
if [ -z "$DESCRIPTION" ]; then
    echo -e "${RED}Description cannot be empty${NC}"
    exit 1
fi

# Format description: remove spaces, convert to lowercase, remove special chars
DESCRIPTION=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 -]//g' | tr ' ' '-' | sed 's/-\+/-/g' | sed 's/^-\|-$//' g)

# Create branch name
BRANCH_NAME="${BRANCH_TYPE}/${DESCRIPTION}"

echo ""
echo -e "${YELLOW}Creating branch:${NC} ${GREEN}${BRANCH_NAME}${NC}"
echo ""

# Confirm
read -p "Continue? (y/n): " -n 1 -r CONFIRM
echo
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo -e "${RED}Cancelled${NC}"
    exit 1
fi

# Check if branch already exists
if git rev-parse --verify "$BRANCH_NAME" >/dev/null 2>&1; then
    echo -e "${YELLOW}Checking out existing branch: ${GREEN}${BRANCH_NAME}${NC}"
    git checkout "$BRANCH_NAME"
else
    echo -e "${YELLOW}Creating and checking out new branch: ${GREEN}${BRANCH_NAME}${NC}"
    git checkout -b "$BRANCH_NAME"
fi

echo ""
echo -e "${GREEN}✓ Branch created/switched successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Make your changes"
echo "2. Stage changes: git add ."
echo "3. Commit: git commit -m \"${BRANCH_TYPE}: short description\""
echo "4. Push: git push -u origin ${BRANCH_NAME}"
echo "5. Create a Pull Request on GitHub"
echo ""
