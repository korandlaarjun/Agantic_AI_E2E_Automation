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
