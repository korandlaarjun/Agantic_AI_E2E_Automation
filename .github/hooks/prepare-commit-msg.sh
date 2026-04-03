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
