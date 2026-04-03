#!/bin/bash
# Post-merge hook - Updates dependencies if changed

if git diff --name-only HEAD@{1} HEAD | grep -q -E "^package\.json$|^package-lock\.json$"; then
    echo "📦 Dependencies changed. Consider running: npm install"
fi

exit 0
