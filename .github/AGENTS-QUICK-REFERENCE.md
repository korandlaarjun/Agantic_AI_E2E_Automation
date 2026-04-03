# Testing Agent Quick Reference

## 🎯 Choose Your Agent

### I'm designing a new testing solution
→ **Test Engineer** (`/agent Test Engineer`)  
Creates frameworks, architecture, utilities, and infrastructure

**Example prompts:**
- "Build a Playwright E2E framework with page objects"
- "Design test infrastructure for microservices"
- "Create reusable test utilities and helpers"

---

### I'm planning test coverage
→ **Test Planner** (`/agent Test Planner`)  
Plans strategy, coverage, prioritization, and roadmaps

**Example prompts:**
- "Plan testing for the user authentication system"
- "Create comprehensive test coverage for checkout flow"
- "Prioritize 100+ test scenarios by business impact"

---

### I'm running tests
→ **Test Executer** (`/agent Test Executer`)  
Executes, monitors, optimizes, and reports on tests

**Example prompts:**
- "Run all E2E tests with 4 workers"
- "Execute tests and generate performance report"
- "Run failed tests with detailed logging"

---

### I'm debugging failures
→ **Test Healer** (`/agent Test Healer`)  
Diagnoses root causes, fixes tests, eliminates flakiness

**Example prompts:**
- "Debug the failing login test with timeout error"
- "Fix flaky API tests that fail randomly"
- "Analyze why tests pass locally but fail in CI"

---

## 🔄 Common Workflows

### Start a New Feature Suite
1. **Test Planner**: "Plan testing for [feature]"
2. **Test Engineer**: "Build test framework"
3. **Test Engineer**: "Create test utilities"
4. **Test Executer**: "Run initial tests"
5. **Test Healer**: "Fix any failures" (if needed)

### Fix Failing Tests
1. **Test Healer**: "Debug this failing test"
2. **Test Engineer**: "Refactor to use this fix pattern" (if structural)
3. **Test Executer**: "Re-run tests to verify"

### Improve Test Suite
1. **Test Executer**: "Run full suite and generate metrics"
2. **Test Planner**: "Review coverage gaps"
3. **Test Engineer**: "Optimize performance"
4. **Test Healer**: "Stabilize any flaky tests"

### Maintain Tests
1. **Test Executer**: "Run tests regularly"
2. **Test Healer**: "Fix any failures"
3. **Test Planner**: "Review coverage periodically"
4. **Test Engineer**: "Refactor when needed"

---

## 📊 Each Agent Provides

### Test Engineer
- Architecture diagrams and documentation
- Framework setup instructions
- Sample code and utilities
- Performance benchmarks
- CI/CD integration guide

### Test Planner
- Test scenarios list
- Coverage matrix
- Risk assessments
- Prioritized roadmap
- Success metrics

### Test Executer
- Test results summary
- HTML reports
- Performance metrics
- Artifact links
- Trend analysis

### Test Healer
- Root cause diagnosis
- Fix implementation
- Verification steps
- Prevention recommendations
- Long-term improvements

---

## ⚡ Tips for Effectiveness

### For Test Engineer
- Be specific about framework preferences
- Mention scalability and maintainability goals
- Ask for documentation and examples
- Request CI/CD setup help

### For Test Planner
- Start with feature requirements
- Mention business priorities
- Ask for risk assessment
- Request prioritization help

### For Test Executer
- Specify test suite location
- Mention environment and resources
- Ask for performance optimization
- Request detailed failure analysis

### For Test Healer
- Provide complete error messages
- Share test output and logs
- Mention how often failure occurs
- Ask for prevention strategies

---

## 🗂️ Agent Files Location

All agents are in `.github/agents/`:
- `test-engineer.agent.md`
- `test-planner.agent.md`
- `test-executer.agent.md`
- `test-healer.agent.md`

Orchestration guide: `.github/AGENTS.md`

---

## 🚀 Advanced Usage

### Orchestrated Testing Workflow
```
Request → Test Planner (plan)
       → Test Engineer (build)
       → Test Executer (run)
       → Test Healer (fix defects)
       → Report results
```

### Performance Optimization
```
Test Executer → measure performance
Test Engineer → optimize framework
Test Executer → verify improvements
Test Healer → stabilize changes
```

### CI/CD Integration
```
Test Engineer → setup pipeline
Test Executer → orchestrate runs
Test Healer → handle failures automatically
Test Planner → track metrics over time
```

---

## 💡 When to Use Multiple Agents

**Sequential**: One agent's output informs the next  
→ Planner → Engineer → Executer → Healer

**Parallel**: Agents work on different aspects  
→ Engineer builds framework while Planner creates strategy

**Iterative**: Cycle through as tests evolve  
→ Engineer, Executer, Healer in continuous loop

---

## ✅ Quality Checklist

Before finishing with each agent, verify:

**Test Engineer**: ✓ Code follows DRY, ✓ Docs complete, ✓ Examples provided  
**Test Planner**: ✓ Coverage >80%, ✓ Risks identified, ✓ Timeline realistic  
**Test Executer**: ✓ Results accurate, ✓ Report actionable, ✓ Artifacts saved  
**Test Healer**: ✓ Root cause found, ✓ Fix tested, ✓ Prevention plan drafted  

---

## 🎓 Learning Path

**Beginner**: Use one agent at a time for specific tasks  
**Intermediate**: Chain agents in workflows  
**Advanced**: Orchestrate all 4 in complex testing scenarios  
**Expert**: Customize agents for domain-specific needs  

---

## 📞 Need Help?

See `.github/AGENTS.md` for:
- Detailed agent descriptions
- Workflow patterns
- Integration points
- Best practices
- FAQ

---

**Start using agents now:**
- Type `/agent` in chat
- Select desired agent
- Provide your test task
- Get expert results!
