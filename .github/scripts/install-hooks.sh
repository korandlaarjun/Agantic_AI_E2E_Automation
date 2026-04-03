#!/bin/bash
# Git Custom Hooks Installation Script

set -e

HOOKS_DIR=".git/hooks"
CUSTOM_HOOKS_DIR=".github/hooks"

# Create custom hooks directory if it doesn't exist
mkdir -p "$CUSTOM_HOOKS_DIR"

# Create pre-commit hook
cat > "$CUSTOM_HOOKS_DIR/pre-commit.sh" << 'EOF'
#!/bin/bash
# Pre-commit hook - Prevents commits to main/master branches directly

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" == "main" ]] || [[ "$BRANCH" == "master" ]]; then
    echo "⚠️  You are attempting to commit directly to '$BRANCH' branch!"
    echo "❌ Direct commits to main/master are not allowed."
    echo ""
    echo "✓ Please create a feature branch instead:"
    echo "  bash .github/scripts/create-branch.sh"
    exit 1
fi

# Check for branch naming convention
if ! [[ "$BRANCH" =~ ^(feature|bugfix|hotfix|chore|docs|test|refactor|perf)/ ]]; then
    echo "⚠️  Branch name '$BRANCH' doesn't follow naming convention"
    echo "ℹ️  Expected format: <type>/<description>"
    echo "   Types: feature, bugfix, hotfix, chore, docs, test, refactor, perf"
    echo ""
    echo "Continue anyway? (y/n)"
    read -r RESPONSE
    if [[ "$RESPONSE" != "y" ]]; then
        exit 1
    fi
fi

exit 0
EOF

chmod +x "$CUSTOM_HOOKS_DIR/pre-commit.sh"

# Create post-merge hook
cat > "$CUSTOM_HOOKS_DIR/post-merge.sh" << 'EOF'
#!/bin/bash
# Post-merge hook - Updates dependencies if changed

if git diff --name-only HEAD@{1} HEAD | grep -q -E "^package\.json$|^package-lock\.json$"; then
    echo "📦 Dependencies changed. Consider running: npm install"
fi

exit 0
EOF

chmod +x "$CUSTOM_HOOKS_DIR/post-merge.sh"

# Create prepare-commit-msg hook
cat > "$CUSTOM_HOOKS_DIR/prepare-commit-msg.sh" << 'EOF'
#!/bin/bash
# Prepare commit message - Auto-adds branch name/type to commit

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

if [[ $COMMIT_SOURCE == "" ]]; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    if [[ "$BRANCH" =~ ^(feature|bugfix|hotfix|chore|docs|test|refactor|perf)/ ]]; then
        # Extract type from branch
        TYPE=$(echo "$BRANCH" | cut -d'/' -f1)
        
        # Get first line of commit message
        FIRST_LINE=$(head -n1 "$COMMIT_MSG_FILE")
        
        # Only add if not already prefixed
        if ! [[ "$FIRST_LINE" =~ ^${TYPE}: ]]; then
            # Add type prefix if commit starts with content
            if [[ ! "$FIRST_LINE" =~ ^# ]]; then
                sed -i.bak "1s/^/${TYPE}: /" "$COMMIT_MSG_FILE"
            fi
        fi
    fi
fi

exit 0
EOF

chmod +x "$CUSTOM_HOOKS_DIR/prepare-commit-msg.sh"

# Install hooks
echo "Installing Git hooks..."

if [ -d ".git" ]; then
    # Copy hooks to .git/hooks
    cp "$CUSTOM_HOOKS_DIR/pre-commit.sh" "$HOOKS_DIR/pre-commit"
    cp "$CUSTOM_HOOKS_DIR/post-merge.sh" "$HOOKS_DIR/post-merge"
    cp "$CUSTOM_HOOKS_DIR/prepare-commit-msg.sh" "$HOOKS_DIR/prepare-commit-msg"
    
    chmod +x "$HOOKS_DIR/pre-commit"
    chmod +x "$HOOKS_DIR/post-merge"
    chmod +x "$HOOKS_DIR/prepare-commit-msg"
    
    echo "✓ Git hooks installed successfully!"
else
    echo "✗ Not a git repository. Run this from the repository root."
    exit 1
fi
