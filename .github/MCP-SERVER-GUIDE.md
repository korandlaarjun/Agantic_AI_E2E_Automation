# Advanced MCP Server Guide

## Overview

The MCP (Model Context Protocol) server has been enhanced with 10 powerful tools for comprehensive testing automation and AI assistant integration.

## Available Tools

### 1. run_tests
Execute Playwright E2E tests with multiple options.

**Parameters:**
- `environment` (string): dev or staging
- `headed` (boolean): Show browser window
- `grep` (string): Filter tests by pattern
- `project` (string): Specific browser (chromium, firefox, webkit)

**Example:**
```
Test Environment: dev
Run with browser visible: headed=true
Filter tests: grep="nopcommerce"
```

### 2. analyze_test_performance
Analyze test execution speed and identify bottlenecks.

**Parameters:**
- `environment` (string): dev or staging
- `threshold_ms` (number): Flag slow tests (default: 5000ms)

### 3. get_test_coverage
Generate coverage reports and metrics.

**Parameters:**
- `format` (string): summary, detailed, or json

### 4. manage_environment
Set up, tear down, or check environment status.

**Parameters:**
- `action` (string): setup, teardown, status, or reset
- `environment` (string): dev or staging

### 5. debug_test_failure
Deep analysis of specific test failures.

**Parameters:**
- `test_name` (string): Name of failing test
- `environment` (string): dev or staging
- `include_logs` (boolean): Include detailed logs

### 6. generate_test_report
Create comprehensive reports in multiple formats.

**Parameters:**
- `format` (string): html, json, markdown, or pdf
- `include_trends` (boolean): Add historical trends
- `date_range` (string): today, week, month, or all

### 7. run_security_tests
Execute security-focused tests.

**Parameters:**
- `environment` (string): dev or staging
- `check_dependencies` (boolean): Scan for vulnerabilities

### 8. run_accessibility_tests
Run WCAG compliance tests.

**Parameters:**
- `environment` (string): dev or staging
- `wcag_level` (string): A, AA, or AAA

### 9. get_mcp_server_status
Get server health and performance metrics.

**Parameters:**
- `include_metrics` (boolean): Include performance data

## Usage Examples

### Example 1: Run Tests with Performance Metrics
```
Tool: run_tests
Parameters:
  environment: "dev"
  headed: false
  grep: "CreateTicket"
```

### Example 2: Analyze Performance Issues
```
Tool: analyze_test_performance
Parameters:
  environment: "staging"
  threshold_ms: 3000
```

### Example 3: Generate Security Report
```
Tool: generate_test_report
Parameters:
  format: "html"
  include_trends: true
  date_range: "week"
```

### Example 4: Debug Failure
```
Tool: debug_test_failure
Parameters:
  test_name: "should load nopcommerce homepage"
  environment: "dev"
  include_logs: true
```

## Integration with Agents

### Performance Agent
- Uses: analyze_test_performance, run_tests, generate_test_report
- Goal: Speed optimization

### Accessibility Agent
- Uses: run_accessibility_tests, debug_test_failure, generate_test_report
- Goal: WCAG compliance

### Security Agent
- Uses: run_security_tests, manage_environment, debug_test_failure
- Goal: Vulnerability detection

### Reliability Agent
- Uses: run_tests (multiple times), debug_test_failure
- Goal: Flakiness detection

## Advanced Workflows

### Comprehensive Test Suite
```
1. Run tests (all environments)
2. Analyze performance
3. Check coverage
4. Run security tests
5. Run accessibility tests
6. Generate report
```

### Failure Diagnosis
```
1. Get test results
2. Identify failures
3. Debug specific failures
4. Check environment status
5. Generate debug report
```

### Performance Optimization
```
1. Run tests with metrics
2. Analyze performance
3. Identify slow tests
4. Run parallel tests
5. Compare results
```

## Configuration

The MCP server is configured in `.vscode/mcp.json`:
```json
{
  "servers": {
    "ai-automation-e2e": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "src/mcp-server.ts"]
    }
  }
}
```

## Starting the Server

```bash
# Option 1: Direct command
npm run mcp-server

# Option 2: Via VS Code
# Server auto-starts when configured in settings

# Option 3: Via MCP settings
# Configured in .vscode/mcp.json
```

## Response Format

All tools return responses in this format:
```json
{
  "content": [
    {
      "type": "text",
      "text": "Response message and data"
    }
  ]
}
```

## Error Handling

Errors are returned with detailed messages:
```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: [Detailed error message]"
    }
  ]
}
```

## Performance Considerations

- **Parallel Test Execution**: Up to 4 workers by default
- **Result Caching**: CSV files cached for quick retrieval
- **Report Generation**: PDFs may take additional time
- **Security Scans**: Full dependency audit may take 10-30s

## Troubleshooting

### Server Won't Start
1. Verify tsx is installed: `npm list tsx`
2. Check file permissions: `ls -la src/mcp-server.ts`
3. Review logs: Set DEBUG environment variable

### Tools Not Available
1. Verify server is running: `npm run mcp-server`
2. Check tools/list response
3. Restart VS Code

### Slow Performance
1. Use environment filtering to reduce scope
2. Enable result caching
3. Run parallel tests instead of sequential
4. Check system resources

## Security Notes

- Do not expose credentials in tool parameters
- Use environment variables for sensitive data
- Audit all generated reports before sharing
- Keep MCP server updated with latest patches
