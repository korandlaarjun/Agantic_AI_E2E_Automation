# AI Automation E2E - Project Setup & Specialized Testing Agents

This is a Node.js/TypeScript project for AI automation end-to-end testing using Playwright.

## 🎯 Quick Start with Testing Agents

We have 4 specialized AI agents to help with every aspect of testing:

| Agent | Purpose | Command |
|-------|---------|---------|
| **Test Engineer** | Build test frameworks and infrastructure | `/agent Test Engineer` |
| **Test Planner** | Plan test coverage and strategy | `/agent Test Planner` |
| **Test Executer** | Run tests and generate reports | `/agent Test Executer` |
| **Test Healer** | Debug and fix test failures | `/agent Test Healer` |

**See `.github/AGENTS-QUICK-REFERENCE.md` for usage examples and workflows.**

## Completed Setup Steps

- [x] Copilot instructions file created
- [x] Project scaffolded with TypeScript and Playwright
- [x] Dependencies installed successfully
- [x] Project compiles without errors
- [x] VS Code tasks configured for build, test, and dev
- [x] 4 Specialized testing agents created and configured

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

## Next Steps

1. **Review agent documentation** in `.github/AGENTS.md`
2. **Try the quick reference** in `.github/AGENTS-QUICK-REFERENCE.md`
3. **Start with Test Planner** to plan your first test suite
4. **Build with Test Engineer** to create the framework
5. **Execute with Test Executer** to run tests
6. **Iterate with Test Healer** for continuous improvement

---

**Need help?** Type `/agent` in chat and select your desired agent. Each provides expert guidance for its role in the testing lifecycle.

