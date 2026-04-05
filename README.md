# Agantic AI E2E Automation

A comprehensive end-to-end testing framework for AI automation using Playwright, TypeScript, and 4 specialized testing agents.

**Repository**: https://github.com/korandlaarjun/Agantic_AI_E2E_Automation  
**This VS Code Workspace** is configured to sync with the above repository for all git operations.

## 🎯 Quick Overview

- **Framework**: Playwright + TypeScript
- **Testing Agents**: 4 specialized AI agents (Engineer, Planner, Executer, Healer)
- **CI/CD Ready**: Automated testing pipeline configured
- **Performance Optimized**: Parallel execution and monitoring included
- **MCP Server**: AI assistant integration for automated testing

## AI Automation E2E Testing

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/korandlaarjun/Agantic_AI_E2E_Automation.git
cd Agantic_AI_E2E_Automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```bash
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api
NODE_ENV=development
```

## 🚀 CI/CD Pipeline

This project includes comprehensive GitHub Actions workflows for automated testing and deployment:

### Workflows Included

- **CI/CD Pipeline** (`.github/workflows/ci.yml`): Main pipeline for testing, building, and deployment
- **Playwright Tests** (`.github/workflows/playwright.yml`): Dedicated E2E testing with scheduled runs
- **Code Quality** (`.github/workflows/quality.yml`): Linting, type checking, security audits, and coverage

### Pipeline Features

- ✅ **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
- ✅ **Cross-Platform**: Ubuntu runners with Playwright container support
- ✅ **Security Scanning**: Automated vulnerability checks
- ✅ **Artifact Management**: Test results, build artifacts, and coverage reports
- ✅ **Deployment Ready**: Staging and production deployment jobs
- ✅ **Scheduled Testing**: Daily automated test runs
- ✅ **Quality Gates**: ESLint, Prettier, TypeScript checks

### Local Testing

Test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act

# Run CI workflow locally
act -j test

# Run with secrets (if needed)
act -j test --secret-file .secrets
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Code generation for recording tests
```bash
npm run codegen http://localhost:3000
```

## Project Structure

```
├── src/
│   └── index.ts          # Main entry point
├── tests/
│   └── example.spec.ts   # Example test file
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
├── package.json
└── README.md
```

## Development

### Build TypeScript
```bash
npm run build
```

### Run linter
```bash
npm run lint
```

### Format code
```bash
npm run format
```

## CI/CD Integration

The project is configured for CI/CD pipelines. Tests will run with:
- Single worker (sequential execution)
- 2 retry attempts on failure
- HTML report generation

## Troubleshooting

- **Port already in use**: Change the port in `playwright.config.ts`
- **Playwright browser issues**: Run `npx playwright install` again
- **Environment variables not loading**: Ensure `.env` file is in the root directory

## License

MIT

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI
```bash
npm run test:ui
```

### Generate tests with Codegen
```bash
npm run codegen
```

## Project Structure

```
ai-automation-e2e/
├── src/                     # Source TypeScript files
├── tests/                   # Test specifications
│   ├── nopcommerce*.spec.ts # nopCommerce e-commerce tests
│   └── pageObjects/         # Page object models
├── dist/                    # Compiled JavaScript (generated)
├── playwright-report/       # Test reports
├── test-results/            # Test artifacts
├── .vscode/                 # VS Code configuration
├── .github/                 # GitHub Actions and agents
├── .env.example             # Environment variables template
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Test Best Practices

1. **Use meaningful test names** that describe what is being tested
2. **Use page objects** for complex test scenarios
3. **Wait for elements** properly using Playwright's auto-waiting
4. **Handle dynamic data** with fixtures or test data factories
5. **Use test hooks** (beforeEach, afterEach) for setup and teardown

## Debugging

### Visual Debugging
```bash
npm run test:debug
```

### Video Recordings
Tests are configured to record videos on failure. Check `test-results/` directory.

### Screenshots
Failed tests automatically capture screenshots. Check `test-results/` directory.

### HTML Report
```bash
npx playwright show-report
```

## CI/CD Integration

This project includes GitHub Actions workflow for automated testing. See `.github/workflows/` for configuration.

## Configuration

### Playwright Config (playwright.config.ts)

- **testDir**: Directory containing test files
- **fullyParallel**: Run tests in parallel
- **retries**: Number of retries for failed tests
- **workers**: Number of parallel workers
- **baseURL**: Base URL for tests
- **projects**: Browser configurations (Chromium, Firefox, WebKit)

### Environment Variables

See `.env.example` for all available configuration options.

## Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify target application is accessible

### Element not found
- Use `npm run codegen` to generate selectors
- Check if elements are dynamically loaded
- Add appropriate waits

### Authentication failures
- Verify credentials in `.env` file
- Check if 2FA is enabled on account
- Ensure cookies are being handled properly

## Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Submit a pull request

## Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Node.js Documentation](https://nodejs.org)

## License

MIT

## Support

For issues and questions, please create an issue in the repository.