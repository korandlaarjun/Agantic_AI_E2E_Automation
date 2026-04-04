# Specialized Testing Agents Guide

## Overview

This framework includes 8 specialized AI agents, each focused on a specific aspect of testing. These agents work together to provide comprehensive testing coverage.

## Agent Directory

### 1. Test Engineer (Core Agent)
**File**: `.github/agents/test-engineer.md` (AGENTS.md)
**Specialization**: Complete testing lifecycle
**Capabilities**:
- Design test frameworks
- Build production-grade tests
- Performance tuning
- End-to-end test orchestration
- Multi-framework support

**When to Use**: Initial test development, framework setup, complex test scenarios

### 2. Test Planner
**File**: `.github/agents/test-planner.md` (AGENTS.md)
**Specialization**: Test planning and strategy
**Capabilities**:
- Analyze requirements
- Plan test coverage
- Risk-based prioritization
- Coverage analysis
- Test strategy development

**When to Use**: Before test development, sprint planning, coverage analysis

### 3. Test Executer
**File**: `.github/agents/test-executer.md` (AGENTS.md)
**Specialization**: Test execution management
**Capabilities**:
- Intelligent parallelization
- Performance monitoring
- Trend analysis
- Batch optimization
- Resource management

**When to Use**: Running test suites, performance monitoring, CI/CD integration

### 4. Test Healer
**File**: `.github/agents/test-healer.md` (AGENTS.md)
**Specialization**: Failure diagnosis and recovery
**Capabilities**:
- Root cause analysis
- Flakiness detection
- Automated fixes
- Pattern recognition
- Failure prevention

**When to Use**: Test failures, debugging, stability improvement

### 5. Performance Agent ⚡
**File**: `.github/agents/performance-agent.md`
**Specialization**: Test speed and optimization
**Capabilities**:
- Performance profiling
- Slow test identification
- Optimization recommendations
- Resource analysis
- Parallelization strategies

**When to Use**: "Why is this slow?", performance degradation, optimization

**MCP Tools Used**:
- analyze_test_performance
- run_tests
- generate_test_report

**Example Prompts**:
- "Analyze performance for this test suite"
- "Which tests are slowest?"
- "Generate performance report"
- "Optimize test execution speed"

### 6. Accessibility Agent ♿
**File**: `.github/agents/accessibility-agent.md`
**Specialization**: WCAG compliance and accessibility
**Capabilities**:
- WCAG level testing (A, AA, AAA)
- Keyboard navigation checks
- Screen reader compatibility
- Color contrast analysis
- ARIA validation

**When to Use**: Accessibility requirements, compliance checks, inclusive testing

**MCP Tools Used**:
- run_accessibility_tests
- debug_test_failure
- generate_test_report

**Example Prompts**:
- "Run WCAG AA tests"
- "Check keyboard accessibility"
- "Verify screen reader support"
- "Generate accessibility report"

### 7. Security Agent 🔒
**File**: `.github/agents/security-agent.md`
**Specialization**: Security testing and vulnerability detection
**Capabilities**:
- Dependency scanning
- Authentication testing
- Authorization validation
- Injection attack prevention
- Sensitive data protection

**When to Use**: Security requirements, vulnerability scanning, compliance audits

**MCP Tools Used**:
- run_security_tests
- debug_test_failure
- manage_environment

**Example Prompts**:
- "Run security audit"
- "Check for XSS vulnerabilities"
- "Verify authentication flow"
- "Scan dependencies"

### 8. Reliability Agent 🛡️
**File**: `.github/agents/reliability-agent.md`
**Specialization**: Test reliability and flakiness detection
**Capabilities**:
- Flakiness identification
- Intermittent failure detection
- Race condition analysis
- Timing issue resolution
- Reliability metrics

**When to Use**: Flaky tests, intermittent failures, test stability

**MCP Tools Used**:
- run_tests (multiple iterations)
- debug_test_failure
- get_test_results
- generate_test_report

**Example Prompts**:
- "Which tests are flaky?"
- "Why does this fail sometimes?"
- "Detect race conditions"
- "Generate reliability report"

## Agent Interaction Patterns

### Sequential Workflow
```
Test Planner → Test Engineer → Test Executer → Test Healer
```

### Parallel Specialists
```
             ├─ Performance Agent
Executer ────├─ Accessibility Agent
             ├─ Security Agent
             └─ Reliability Agent
```

### Failure Recovery Cycle
```
Test Executer (discovers failure)
    ↓
Test Healer (diagnoses issue)
    ↓
Specialized Agent (fixes specific issue)
    ↓
Test Executer (validates fix)
```

## Usage Examples

### Example 1: New Feature Testing
```
1. Test Planner: Plan coverage for login feature
2. Test Engineer: Design comprehensive test suite
3. Test Executer: Run initial tests
4. Test Healer: Debug any failures
5. Accessibility Agent: Verify WCAG compliance
6. Security Agent: Check authentication
```

### Example 2: Performance Issues
```
1. Test Executer: Run tests, notice slowdown
2. Performance Agent: Analyze performance metrics
3. Test Engineer: Implement optimizations
4. Test Executer: Validate improvements
5. Reliability Agent: Check stability
```

### Example 3: Intermittent Failures
```
1. Test Executer: Runs fail sometimes
2. Reliability Agent: Detect flakiness pattern
3. Test Healer: Analyze root cause
4. Test Engineer: Stabilize tests
5. Test Executer: Validate fix with multiple runs
```

## Agent Commands

### Invoke Specific Agent
```bash
# General testing
/agent Test Engineer
/agent Test Planner
/agent Test Executer
/agent Test Healer

# Specialized testing
/agent Performance Agent
/agent Accessibility Agent
/agent Security Agent
/agent Reliability Agent
```

### Agent Capabilities Summary
```bash
# List all available agents
/list agents

# Get agent documentation
/help Test Engineer
/help Performance Agent

# Ask agent for specific task
/agent Performance Agent
→ "Analyze why tests are running slow"
```

## Best Practices

### 1. Use Right Agent for Task
- Planning: Test Planner
- Building: Test Engineer
- Running: Test Executer
- Debugging: Test Healer
- Specialized: Domain-specific agents

### 2. Agent Collaboration
- Let Test Planner review coverage
- Use Test Engineer to build complex tests
- Rely on Test Executer for CI/CD
- Always involve Test Healer for failures
- Consult specialists for domain issues

### 3. Continuous Improvement
- Performance Agent: Monthly optimization
- Accessibility Agent: Compliance checks
- Security Agent: Regular audits
- Reliability Agent: Weekly reviews

### 4. Documentation
- Record agent recommendations
- Track pattern discoveries
- Save reusable solutions
- Build playbooks

## Advanced Agent Features

### Agent Memory
Each agent maintains context on:
- Previous test runs
- Failure patterns
- Performance trends
- Success strategies

### Agent Learning
- Learns from past failures
- Recognizes patterns
- Suggests preventive actions
- Improves recommendations

### Agent Orchestration
- Agents can call each other
- Share results and findings
- Coordinate on complex tasks
- Provide comprehensive reports

## Troubleshooting

### Agent Not Responding
1. Check agent is available: `/list agents`
2. Verify MCP server running: `npm run mcp-server`
3. Review agent requirements
4. Check network connectivity

### Agent Recommendations Not Clear
1. Provide more context in prompt
2. Ask for specific format (JSON, report, etc.)
3. Reference previous results
4. Break into smaller questions

### Performance Issues
1. Run Performance Agent analysis
2. Check system resources
3. Use Reliability Agent for stability
4. Consult Test Executer for optimization

## Development

### Creating Custom Agents
1. Add agent markdown file to `.github/agents/`
2. Define specialization and capabilities
3. Link to MCP tools
4. Document example prompts
5. Add to agent directory

### Agent Template
```markdown
name: [Agent Name]
description: [Brief description]

purpose: |
  [Detailed purpose and goals]

capabilities:
  - [Capability 1]
  - [Capability 2]

integration:
  mcp_tools:
    - tool_name
    - another_tool

example_prompts:
  - "Example prompt 1"
  - "Example prompt 2"
```
