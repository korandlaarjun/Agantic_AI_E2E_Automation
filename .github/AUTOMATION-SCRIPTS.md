# Advanced Automation Scripts Guide

## Quick Reference

### Available Scripts

#### Test Orchestration
```bash
npm run test:metrics [env]      # Run tests with performance metrics
npm run test:parallel [env]     # Run tests in parallel (4 workers)
npm run test:flaky [name] [n]   # Detect flaky tests (n iterations, default 5)
```

#### Quality Assurance
```bash
npm run quality:check           # Full quality check (lint, format, build)
npm run quality:fix             # Auto-fix quality issues
npm run lint                    # Run ESLint
npm run lint:fix                # Fix lint issues
npm run format:check            # Check formatting
npm run format                  # Format code
```

#### Analysis & Reporting
```bash
npm run analyze                 # Analyze test results
npm run analyze:compare         # Compare results across environments
npm run analyze:trend           # View trends and metrics
```

#### Standard Tests
```bash
npm test                        # Run all tests
npm run test:headed            # Run tests with browser visible
npm run test:debug             # Run tests in debug mode
npm run test:ui                # Run tests in UI mode
```

#### MCP Server
```bash
npm run mcp-server             # Start MCP server
```

## Detailed Breakdown

### Test Orchestration Scripts

Located in: `.github/scripts/orchestrate-tests.sh`

#### Running with Metrics
```bash
bash .github/scripts/orchestrate-tests.sh metrics dev
bash .github/scripts/orchestrate-tests.sh metrics staging
```
**Output**: Performance indicators, test duration, execution details

#### Parallel Execution
```bash
bash .github/scripts/orchestrate-tests.sh parallel dev
```
**Uses**: 4 worker processes for faster execution

#### Flakiness Detection
```bash
# Run specific test 5 times
bash .github/scripts/orchestrate-tests.sh flakiness "nopcommerce" 5

# Run all tests 10 times
bash .github/scripts/orchestrate-tests.sh flakiness "" 10
```
**Output**: Pass/fail pattern analysis, reliability metrics

### Result Analysis Scripts

Located in: `.github/scripts/analyze-results.sh`

#### Single Environment Analysis
```bash
bash .github/scripts/analyze-results.sh analyze dev
```
**Shows**:
- Total test records
- Failed test count
- Timing issues
- Sample results

#### Cross-Environment Comparison
```bash
bash .github/scripts/analyze-results.sh compare
```
**Compares**: dev vs staging results

#### Trend Analysis
```bash
bash .github/scripts/analyze-results.sh trend
```
**Shows**:
- Overall health status
- Uptime metrics
- Average duration
- Pass rate

#### All-In-One Report
```bash
bash .github/scripts/analyze-results.sh all dev
```
**Combines**: All analyses above

## Workflow Examples

### Daily Quality Check
```bash
npm run quality:check
npm test
npm run analyze
```

### Pre-Commit Validation
```bash
npm run lint:fix
npm run format
npm run build
npm test
```

### Performance Investigation
```bash
npm run test:metrics dev
npm run analyze
# Review slow tests
npm run test:parallel dev
npm run analyze:trend
```

### Flakiness Resolution
```bash
npm run test:flaky "FailingTest" 10
npm run analyze
# Identify pattern and fix
npm test
npm run test:flaky "FixedTest" 10
```

### Full Quality Cycle
```bash
npm run quality:fix
npm run build
npm run test:metrics dev
npm run test:parallel staging
npm run analyze:compare
npm run analyze:trend
```

## Integration with CI/CD

These scripts are automatically run in GitHub Actions workflows:

### `.github/workflows/ci.yml`
- `quality:check` → ESLint, Prettier, TypeScript
- `test` → Run full test suite
- `analyze` → Generate reports

### `.github/workflows/playwright.yml`
- Scheduled daily E2E tests
- Performance monitoring
- Result artifacts

### `.github/workflows/quality.yml`
- Lint and format checks
- Security audits
- Coverage analysis

## Performance Metrics Reference

### Script Performance
```
Sequential Tests:     ~45-60 seconds
Parallel Tests (4):   ~15-20 seconds
Metrics Capture:      +5-10 seconds
Performance Analysis: ~2-5 seconds
Full Report Gen:      ~10-30 seconds
```

### Recommended Thresholds
```
Slow Test:          > 5000ms (5 seconds)
Very Slow Test:     > 10000ms (10 seconds)
Test Overall:       < 60 seconds ideal
Target Pass Rate:   > 98%
```

## Troubleshooting Scripts

### Script Won't Execute
```bash
# Make scripts executable
chmod +x .github/scripts/orchestrate-tests.sh
chmod +x .github/scripts/analyze-results.sh
```

### Permission Denied
```bash
# Check permissions
ls -la .github/scripts/

# Fix if needed
chmod +x .github/scripts/*.sh
```

### No Results Found
```bash
# Ensure tests have been run
npm test

# Check results directory
ls -la tests/test-results/

# Run analysis again
npm run analyze
```

### Slow Script Execution
```bash
# Use parallel mode
npm run test:parallel dev

# Check system resources
# Reduce worker count if needed
```

## Advanced Usage

### Custom Test Filtering
```bash
# Combine orchestration with grep
npm run test -- --grep "nopcommerce"

# Run with metrics
npm run test:metrics dev
```

### Environment-Specific Analysis
```bash
# Analyze specific environment
npm run analyze dev
npm run analyze staging

# Compare before/after optimization
npm run analyze:compare
```

### Batch Operations
```bash
# Run quality checks, tests, and analysis
npm run quality:check && \
npm run test:metrics dev && \
npm run analyze

# Full validation pipeline
npm run quality:fix && \
npm run build && \
npm run test:parallel dev && \
npm run analyze:trend
```

## Output Formats

### Metrics Output
```
Timing: ~2.5s per test
Workers: 4
Parallelization: Enabled
Performance: Optimal
```

### Analysis Output
```
📊 Metric: Value
✓ Passing Status
⚠️  Warning
✗ Critical Issue
```

### Report Output
```
═══════════════════════
  Analysis Report
═══════════════════════

Metric 1: Value
Metric 2: Value

Sample Data...

═══════════════════════
```

## Next Steps

1. **Daily Use**:
   - Use `npm run quality:check` before commits
   - Run `npm test` regularly

2. **Investigation**:
   - Use `npm run test:metrics` for performance issues
   - Use `npm run test:flaky` for intermittent failures

3. **Reporting**:
   - Use `npm run analyze` for result summaries
   - Use `npm run analyze:trend` for trends

4. **Optimization**:
   - Use `npm run test:parallel` for faster execution
   - Review analysis output for improvements
