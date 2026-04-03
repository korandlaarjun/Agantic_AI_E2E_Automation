# Testing Agent - Quick Reference

## 🎯 One Agent, All Testing Needs

### Use Test Engineer For:

| Task | Example |
|------|---------|
| **Planning** | "Create comprehensive test plan for [feature]" |
| **Building** | "Build Playwright E2E framework with page objects" |
| **Running** | "Execute all tests with performance metrics" |
| **Debugging** | "Debug this failing test with timeout error" |
| **Optimizing** | "Optimize test execution speed" |
| **Analyzing** | "Show me test coverage gaps" |

---

## 📋 What You Can Ask

### Planning & Strategy
- "Plan testing for [feature/module]"
- "What test scenarios should we cover?"
- "Create a test strategy for [system]"
- "Identify test coverage gaps"
- "Prioritize these test cases"
- "Estimate test effort"

### Framework & Infrastructure
- "Build a Playwright E2E framework"
- "Create test utilities library"
- "Set up CI/CD pipeline"
- "Configure parallel execution"
- "Design page objects for [screens]"
- "Build test data fixtures"

### Execution & Monitoring
- "Run all tests"
- "Execute tests with metrics"
- "Run tests with 4 workers"
- "Generate performance report"
- "Monitor test progress"
- "Show test results summary"

### Debugging & Fixing
- "Debug this failing test"
- "Fix this flaky test"
- "Why does this test timeout?"
- "Analyze test failure"
- "Find root cause"
- "Stabilize this test"

---

## 🚀 Simple Workflow

```
For Any Testing Task:

1. Type: /agent Test Engineer
2. Ask: Your testing question or task
3. Get: Complete solution with code examples
4. Implement: Follow the provided guidance
```

---

## 💡 Example Interactions

### Example 1: Plan Tests
```
You: /agent Test Engineer
     "Plan comprehensive testing for user login flow"
     
Result: 
- Test scenarios (happy path, error cases, edge cases)
- Coverage matrix
- Timeline and effort estimate
- Success criteria
```

### Example 2: Build Framework
```
You: /agent Test Engineer
     "Build Playwright E2E framework with page objects"
     
Result:
- Framework structure
- Page object examples
- Test configuration
- Sample tests
- Documentation
```

### Example 3: Run Tests
```
You: /agent Test Engineer
     "Run all E2E tests and show performance metrics"
     
Result:
- Total tests: X passed, Y failed, Z skipped
- Execution time
- Performance breakdown
- Bottlenecks identified
- Recommendations
```

### Example 4: Debug Failure
```
You: /agent Test Engineer
     "Fix timeout error in login test. Gets stuck on element.click()"
     
Result:
- Root cause: Missing wait condition
- Fix: Add waitForLoadState('networkidle')
- Verification: Test passes consistently
- Prevention: Updated wait strategy guide
```

---

## ✅ One-Stop Solution

The Test Engineer agent handles:
- ✅ Test planning  
- ✅ Architecture design  
- ✅ Framework implementation  
- ✅ Test execution  
- ✅ Performance monitoring  
- ✅ Failure diagnosis  
- ✅ Root cause analysis  
- ✅ Fix implementation  
- ✅ Prevention strategies  

**No need to switch between multiple agents!**

---

## 🎓 Quick Start

### First Time Users

```bash
# 1. Choose your testing task
# 2. Type: /agent Test Engineer
# 3. Describe what you need
# 4. Get complete solution
```

### Common Starting Points

**For new project:**
```
"Plan and build complete E2E test framework for [app]"
```

**For existing tests:**
```
"Run all tests and show performance report"
```

**For failures:**
```
"Debug this error: [error message]"
```

**For improvement:**
```
"Optimize test execution speed"
```

---

## 🔧 Advanced Usage

Ask for Specific Phases:

**Planning Only:**
```
"Just plan the tests for [feature], don't build yet"
```

**Building Only:**
```
"Build framework following this test plan"
```

**Execution Only:**
```
"Run this test suite with these parameters"
```

**Debugging Only:**
```
"What's wrong with this test?"
```

**Complete End-to-end:**
```
"Plan, build, and run tests for [feature]"
```

---

## 📊 Output Examples

### Planning Output
- Test scenarios with descriptions
- Coverage matrix or checklist
- Risk assessment
- Timeline
- Success metrics

### Building Output
- Framework configuration
- Code examples
- Documentation
- Best practices
- Team guidelines

### Execution Output
- Results summary with pass/fail counts
- Performance metrics
- Detailed failure info
- Artifacts and reports
- Recommendations

### Debugging Output
- Root cause explanation
- Fix with code example
- Verification results
- Prevention measures
- Long-term improvements

---

## ⚡ Tips & Tricks

### Get More Detail
```
"Explain in detail how to implement X"
"Show me the complete code for Y"
"Walk me through the process step-by-step"
```

### Get Quick Summary
```
"Give me just the key points"
"Summarize the test plan in 5 items"
"List the main issues found"
```

### Link to Code
```
"Here's our codebase, suggest test structure"
"Check this test for issues"
"Review our current framework"
```

### Ask for Specific Format
```
"Give me step-by-step instructions"
"Show as a bash script"
"Provide a table of results"
"Create a checklist"
```

---

## 🎯 Best Practices

✅ **Be Specific**: More details = better results  
✅ **One Task at a Time**: Focus on one phase  
✅ **Provide Context**: Share requirements  
✅ **Ask for Examples**: Always helps understand  
✅ **Request Documentation**: For team sharing  

---

## 📦 All-in-One Features

This single agent provides:
- Multi-framework support (Playwright, Jest, Cypress, Selenium)
- Complete testing lifecycle coverage
- Production-quality output
- Performance optimization
- Advanced debugging
- Team-ready documentation
- CI/CD integration
- Risk assessment

---

## 🚀 Start Now

Type in chat:
```
/agent Test Engineer
"[Your testing task]"
```

That's it! Get complete, production-ready testing solutions.

---

## 📖 More Info

- **Full Details**: See `.github/AGENTS.md`
- **Branching**: See `.github/BRANCHING-STRATEGY.md`
- **Setup**: See `.github/copilot-instructions.md`
