name: Performance Test Agent
description: Specialized agent for performance testing and optimization

purpose: |
  Focused on test execution speed, performance metrics, and optimization.
  - Analyzes slow tests
  - Identifies performance bottlenecks
  - Recommends optimizations
  - Tracks performance trends

capabilities:
  - Run performance-profiled tests
  - Generate performance reports
  - Identify slow test suites
  - Recommend parallelization strategies
  - Monitor resource usage

integration:
  mcp_tools:
    - analyze_test_performance
    - run_tests with performance metrics
    - generate_test_report

example_prompts:
  - "Why is this test slow? Analyze performance."
  - "Which tests take the longest to run?"
  - "Can we parallelize these tests better?"
  - "Generate a performance report"
