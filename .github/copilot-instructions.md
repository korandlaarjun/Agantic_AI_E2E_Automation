# AI Automation E2E - Project Setup & Specialized Testing Agents

This is a Node.js/TypeScript project for AI automation end-to-end testing using Playwright.

## 🎯 Quick Start with Test Engineer Agent

We have one comprehensive AI agent that handles all aspects of testing:

| Agent | Purpose | Command |
|-------|---------|---------|
| **Test Engineer** | Complete testing lifecycle - plan, build, execute, debug | `/agent Test Engineer` |

**See `.github/AGENTS-QUICK-REFERENCE.md` for quick examples and use cases.**

## Completed Setup Steps

- [x] Copilot instructions file created
- [x] Project scaffolded with TypeScript and Playwright
- [x] Dependencies installed successfully
- [x] Project compiles without errors
- [x] VS Code tasks configured for build, test, and dev
- [x] Comprehensive Test Engineer agent configured for all testing needs
- [x] Git hooks and branching strategy implemented

## Project Information

**Name:** ai-automation-e2e  
**Version:** 1.0.0  
**Type:** Node.js/TypeScript  
**Testing Framework:** Playwright  
**Agents Included:** Test Engineer, Test Planner, Test Executer, Test Healer

## Available Scripts

- `npm test` - Run Playwright tests
- `npm run test:headed` - Run tests with browsers visible
- `npm run test:ui` - Run tests in UI mode
- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Quick Start

1. Install dependencies: `npm install`
2. Configure `.env` file with `BASE_URL` and other required variables
3. Run tests: `npm test`
4. Use agents for testing tasks (see below)

## Using the Testing Agents

### Build a Test Framework
```
/agent Test Engineer
→ "Design a Playwright E2E framework with page objects"
```

### Plan Test Coverage
```
/agent Test Planner
→ "Plan testing for the login feature"
```

### Execute Tests
```
/agent Test Executer
→ "Run all tests with performance metrics"
```

### Fix Test Failures
```
/agent Test Healer
→ "Debug this failing test and provide fixes"
```

## 🌿 Branching Strategy

Every change gets its own properly-named branch with a description. We follow a **branch-per-change** workflow.

### Quick Branch Creation

```bash
# Interactive branch creation with validation
bash .github/scripts/create-branch.sh
```

### Branch Types

| Type | Prefix | Use For |
|------|--------|---------|
| `feature/` | New functionality | Add new tests or features |
| `bugfix/` | Bug fixes | Fix broken tests |
| `hotfix/` | Critical production fixes | Urgent issues |
| `chore/` | Maintenance | Update dependencies |
| `docs/` | Documentation | Update README or guides |
| `test/` | Test additions | New test cases |
| `refactor/` | Refactoring | Improve code quality |
| `perf/` | Performance | Optimize execution |

### Example Workflows

**Adding a Feature:**
```bash
bash .github/scripts/create-branch.sh
# Select: feature
# Description: add-healer-agent
# Results in: feature/add-healer-agent
git add .
git commit -m "feature: Add Test Healer agent with failure diagnosis"
git push -u origin feature/add-healer-agent
```

**Fixing a Bug:**
```bash
bash .github/scripts/create-branch.sh
# Select: bugfix
# Description: fix-timeout-error
# Results in: bugfix/fix-timeout-error
git add .
git commit -m "bugfix: Fix timeout in parallel execution"
git push -u origin bugfix/fix-timeout-error
```

### Git Hooks (Automatic Protection)

- ✅ **Pre-commit**: Prevents commits directly to `main`/`master`
- ✅ **Prepare-commit-msg**: Auto-prefixes commits with branch type
- ✅ **Post-merge**: Notifies about dependency changes

### Documentation

See **`.github/BRANCHING-STRATEGY.md`** for complete details including:
- Detailed branch naming conventions
- Commit message format
- Complete workflow examples
- Best practices
- Command reference

## Project Structure

```
├── src/               # Source TypeScript files
├── tests/             # Test specifications
├── dist/              # Compiled JavaScript (generated)
├── .vscode/           # VS Code configuration
│   └── tasks.json     # Build and test tasks
├── .github/
│   ├── agents/        # Specialized testing agents
│   ├── AGENTS.md      # Detailed agent documentation
│   └── AGENTS-QUICK-REFERENCE.md  # Quick reference guide
├── .env.example       # Environment variables template
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Agent Documentation

- **Full Guide**: `.github/AGENTS.md` - Complete orchestration guide with workflows
- **Quick Reference**: `.github/AGENTS-QUICK-REFERENCE.md` - Fast lookup and examples
- **Individual Agents**: `.github/agents/` - Detailed agent files

## Configuration

- Environment variables: `.env` (copy from `.env.example`)
- Playwright settings: `playwright.config.ts`
- TypeScript settings: `tsconfig.json`
- VS Code tasks: `.vscode/tasks.json`

## Testing Workflow Recommendations

### For New Features
1. **Test Planner**: Plan test coverage
2. **Test Engineer**: Build test framework
3. **Test Executer**: Run tests
4. **Test Healer**: Fix any failures (if needed)

### For Maintenance
1. **Test Executer**: Run test suite regularly
2. **Test Healer**: Fix failures as they occur
3. **Test Planner**: Review coverage periodically
4. **Test Engineer**: Optimize and refactor as needed

### For CI/CD
1. **Test Engineer**: Configure pipeline
2. **Test Executer**: Orchestrate execution
3. **Test Healer**: Provide failure feedback

## Troubleshooting

- **Build errors**: Run `npm install` to ensure all dependencies are installed
- **Tests not running**: Check that `.env` is configured correctly
- **Port conflicts**: Modify `BASE_URL` in `.env` or `playwright.config.ts`
- **Test failures**: Use `/agent Test Healer` to investigate and fix

## Advanced Features

Each agent includes advanced capabilities:

**Test Engineer**: Multi-framework support, design patterns, performance tuning  
**Test Planner**: Risk-based prioritization, comprehensive coverage analysis  
**Test Executer**: Intelligent parallelization, performance monitoring  
**Test Healer**: Root cause analysis, flakiness detection and resolution

## Best Practices

1. Always use Test Planner before building tests
2. Leverage Test Engineer for production-grade frameworks
3. Monitor trends with Test Executer
4. Act quickly with Test Healer on failures
5. Document all architectural decisions
6. Keep coverage >80% for critical paths

## Development Workflow

### Initial Setup

```bash
# Complete environment setup with hooks and dependencies
bash .github/scripts/setup-dev.sh
```

### Per-Change Workflow

```bash
# 1. Create a properly-named branch
bash .github/scripts/create-branch.sh

# 2. Make changes and test locally
npm test

# 3. Commit with automatic type prefix
git add .
git commit -m "Your detailed description"

# 4. Push to remote
git push -u origin <branch-name>

# 5. Create Pull Request on GitHub
# (Link to issue, request reviewers)
```

### Branch Naming Enforced By Git Hooks

- ✅ Prevents commits to `main`/`master` directly
- ✅ Auto-validates branch name format
- ✅ Prepends commit type automatically
- ✅ Alerts on dependency changes

**See `.github/BRANCHING-STRATEGY.md` for complete details**

## Best Practices

1. Always use Test Planner before building tests
2. Leverage Test Engineer for production-grade frameworks
3. Monitor trends with Test Executer
4. Act quickly with Test Healer on failures
5. Document all architectural decisions
6. Keep coverage >80% for critical paths
7. Create a new branch for every change (enforced by hooks)
8. Follow branch naming conventions (enforced by hooks)
9. Write descriptive commit messages with type prefix
10. Push regularly and create PRs for peer review

## Next Steps

1. **Review agent documentation** in `.github/AGENTS.md`
2. **Try the quick reference** in `.github/AGENTS-QUICK-REFERENCE.md`
3. **Start with Test Planner** to plan your first test suite
4. **Build with Test Engineer** to create the framework
5. **Execute with Test Executer** to run tests
6. **Iterate with Test Healer** for continuous improvement

---

**Need help?** Type `/agent` in chat and select your desired agent. Each provides expert guidance for its role in the testing lifecycle.

