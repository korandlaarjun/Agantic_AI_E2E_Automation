# Branching Strategy for Agantic AI E2E Automation

## Overview

We follow a **branch-per-change** strategy with clear naming conventions and descriptions. Every modification gets its own branch for better tracking, review, and collaboration.

## Branch Types

| Type | Prefix | Purpose | Example |
|------|--------|---------|---------|
| **Feature** | `feature/` | New functionality or features | `feature/add-login-tests` |
| **Bugfix** | `bugfix/` | Bug fixes | `bugfix/fix-timeout-error` |
| **Hotfix** | `hotfix/` | Critical production fixes | `hotfix/critical-api-error` |
| **Chore** | `chore/` | Maintenance, dependencies, config | `chore/update-dependencies` |
| **Docs** | `docs/` | Documentation updates | `docs/update-readme` |
| **Test** | `test/` | Test additions/updates | `test/add-e2e-coverage` |
| **Refactor** | `refactor/` | Code refactoring | `refactor/improve-page-objects` |
| **Performance** | `perf/` | Performance improvements | `perf/optimize-parallel-execution` |

## Naming Conventions

### Format
```
<type>/<description>
```

### Rules
- Use lowercase letters, numbers, and hyphens only
- Use hyphens between words (kebab-case)
- Keep description concise but descriptive (2-5 words)
- No spaces or special characters
- Be specific about what the change addresses

### Examples
```
✓ feature/add-test-engineer-agent
✓ bugfix/fix-flaky-login-test
✓ docs/add-branching-strategy
✓ chore/upgrade-playwright-version
✗ feature/stuff           # Too vague
✗ feature/Add New Tests   # Wrong format
✗ feature add tests       # Spaces instead of hyphens
```

## Creating a Branch

### Automated Way (Recommended)

```bash
bash .github/scripts/create-branch.sh
```

The script will:
1. Ask you to select a branch type
2. Prompt for a description
3. Format and create the branch automatically
4. Provide next steps

### Manual Way

```bash
# Create feature branch
git checkout -b feature/your-description

# Create bugfix branch
git checkout -b bugfix/your-description

# Create other types
git checkout -b docs/your-description
git checkout -b chore/your-description
```

## Branch Descriptions

### Always Include in Commit Message

```
feature: Add Test Engineer agent

- Created test-engineer.agent.md with full specifications
- Integrated with Test Planner for workflow coordination
- Added comprehensive documentation and examples
- Supports multiple testing frameworks (Playwright, Jest, Cypress)

Relates to: #123 (if applicable)
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types (matching branch types):**
- `feature:` - New feature
- `bugfix:` - Bug fix
- `hotfix:` - Critical fix
- `chore:` - Maintenance
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Refactoring
- `perf:` - Performance

## Workflow Example

### 1. Create Branch for New Feature
```bash
bash .github/scripts/create-branch.sh
# Select: feature
# Description: add-healer-agent
# Creates: feature/add-healer-agent
```

### 2. Make Changes
```bash
# Edit files, create new files, etc.
git add .
```

### 3. Commit with Description
```bash
git commit -m "feature: Add Test Healer agent

- Implements failure diagnosis and recovery
- Root cause analysis capabilities
- Prevention strategies and recommendations
- Integration with Test Engineer for fixes

Closes #42"
```

### 4. Push to Remote
```bash
git push -u origin feature/add-healer-agent
```

### 5. Create Pull Request
- Use GitHub UI to create PR
- Add detailed description in PR body
- Link to related issues
- Request reviewers

### 6. After Merge
- Delete branch locally: `git branch -d feature/add-healer-agent`
- Delete on remote: `git push origin --delete feature/add-healer-agent`

## Best Practices

### ✅ DO

- ✓ Create a new branch for every change
- ✓ Use descriptive branch names
- ✓ Keep commits atomic and focused
- ✓ Write meaningful commit messages with descriptions
- ✓ Push regularly to backup work
- ✓ Create pull requests for peer review
- ✓ Link branches to issues when applicable
- ✓ Update branch descriptions as work evolves

### ❌ DON'T

- ✗ Commit directly to `main` or `master`
- ✗ Use vague branch names like `feature/fixes`
- ✗ Mix multiple changes in one branch
- ✗ Leave branches unmerged or stale (>30 days)
- ✗ Use branch names with spaces or special characters
- ✗ Forget to update documentation when adding features

## Current Branches

```
main                           - Production-ready code
├─ feature/*                   - Feature branches
├─ bugfix/*                    - Bug fix branches
├─ hotfix/*                    - Critical fixes
├─ docs/*                      - Documentation updates
├─ chore/*                     - Maintenance
├─ test/*                      - Test additions
├─ refactor/*                  - Code refactoring
└─ perf/*                      - Performance work
```

## Integration with CI/CD

- All branches get tested automatically
- Branch protection requires passing checks
- Merges to `main` require approval and passing tests
- Workflow status visible in branch names with badges

## For Pull Requests

### PR Title Format
Use the branch name as PR title:
```
feature/add-test-planner-agent
```

### PR Description Template
```markdown
## Description
Brief summary of changes

## Type of Change
- [ ] New Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Performance Improvement
- [ ] Code Refactoring

## Related Issues
Closes #123

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Changes are documented
- [ ] Tests added/updated
- [ ] No breaking changes
```

## Command Reference

```bash
# Create a new branch (interactive)
bash .github/scripts/create-branch.sh

# Create branch manually
git checkout -b feature/description

# List all branches
git branch -a

# Switch to branch
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Rename branch
git branch -m old-name new-name

# View branch info
git branch -vv
```

## Tips & Tricks

### Recover a deleted branch
```bash
git reflog
git checkout -b recovered-branch <commit-hash>
```

### Keep branch updated with main
```bash
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

### See unpushed commits
```bash
git log origin/your-branch..your-branch
```

### Auto-cleanup merged branches
```bash
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

---

**Questions?** See the full Git documentation or check out `.github/scripts/create-branch.sh` for automation.
