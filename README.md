# AI Automation E2E Testing

A comprehensive end-to-end testing framework for AI automation using Playwright and TypeScript.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-automation-e2e
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
zendesk-e2e-automation/
├── tests/
│   ├── example.spec.ts       # Example test file
│   └── ...                   # Add more test files here
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('https://zendesk.com');
  await expect(page).toHaveTitle(/Zendesk/);
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
- Verify Zendesk instance is accessible

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
- [Zendesk API Documentation](https://developer.zendesk.com)
- [Zendesk Support](https://support.zendesk.com)

## License

MIT

## Support

For issues and questions, please create an issue in the repository.