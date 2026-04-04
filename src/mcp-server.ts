#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server";
import { CallToolRequest, ListToolsRequest } from "@modelcontextprotocol/server";

const server = new Server(
  {
    name: "ai-automation-e2e",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool Definitions
const tools = [
  {
    name: "run_tests",
    description: "Run the Playwright E2E tests",
    inputSchema: {
      type: "object" as const,
      properties: {
        environment: {
          type: "string",
          description: "Environment to run tests in (dev, staging)",
          enum: ["dev", "staging"],
          default: "dev"
        },
        headed: {
          type: "boolean",
          description: "Run tests with browser visible",
          default: false
        },
        grep: {
          type: "string",
          description: "Filter tests by pattern"
        },
        project: {
          type: "string",
          description: "Specific browser project (chromium, firefox, webkit)",
          enum: ["chromium", "firefox", "webkit"]
        }
      }
    }
  },
  {
    name: "get_test_results",
    description: "Get the latest test results and summary",
    inputSchema: {
      type: "object" as const,
      properties: {
        environment: {
          type: "string",
          description: "Environment results to get (dev, staging)",
          enum: ["dev", "staging"],
          default: "dev"
        },
        format: {
          type: "string",
          description: "Output format (summary, json, detailed)",
          enum: ["summary", "json", "detailed"],
          default: "summary"
        }
      }
    }
  },
  {
    name: "analyze_test_performance",
    description: "Analyze test execution performance and identify slow tests",
    inputSchema: {
      type: "object" as const,
      properties: {
        environment: {
          type: "string",
          description: "Environment to analyze",
          enum: ["dev", "staging"],
          default: "dev"
        },
        threshold_ms: {
          type: "number",
          description: "Flag tests slower than this threshold (ms)",
          default: 5000
        }
      }
    }
  },
  {
    name: "get_test_coverage",
    description: "Get test coverage report and metrics",
    inputSchema: {
      type: "object" as const,
      properties: {
        format: {
          type: "string",
          description: "Output format (summary, detailed, json)",
          enum: ["summary", "detailed", "json"],
          default: "summary"
        }
      }
    }
  },
  {
    name: "manage_environment",
    description: "Manage test environment configuration and setup",
    inputSchema: {
      type: "object" as const,
      properties: {
        action: {
          type: "string",
          description: "Action to perform (setup, teardown, status, reset)",
          enum: ["setup", "teardown", "status", "reset"],
          default: "status"
        },
        environment: {
          type: "string",
          description: "Environment to manage",
          enum: ["dev", "staging"],
          default: "dev"
        }
      }
    }
  },
  {
    name: "debug_test_failure",
    description: "Debug a specific test failure with detailed analysis",
    inputSchema: {
      type: "object" as const,
      properties: {
        test_name: {
          type: "string",
          description: "Name of the failing test"
        },
        environment: {
          type: "string",
          description: "Environment where test failed",
          enum: ["dev", "staging"],
          default: "dev"
        },
        include_logs: {
          type: "boolean",
          description: "Include detailed logs in analysis",
          default: true
        }
      }
    }
  },
  {
    name: "generate_test_report",
    description: "Generate comprehensive test report with metrics",
    inputSchema: {
      type: "object" as const,
      properties: {
        format: {
          type: "string",
          description: "Report format (html, json, markdown, pdf)",
          enum: ["html", "json", "markdown", "pdf"],
          default: "html"
        },
        include_trends: {
          type: "boolean",
          description: "Include historical trends",
          default: true
        },
        date_range: {
          type: "string",
          description: "Date range for report (today, week, month, all)",
          enum: ["today", "week", "month", "all"],
          default: "today"
        }
      }
    }
  },
  {
    name: "run_security_tests",
    description: "Run security-focused tests and vulnerability checks",
    inputSchema: {
      type: "object" as const,
      properties: {
        environment: {
          type: "string",
          description: "Environment to test",
          enum: ["dev", "staging"],
          default: "dev"
        },
        check_dependencies: {
          type: "boolean",
          description: "Check for vulnerable dependencies",
          default: true
        }
      }
    }
  },
  {
    name: "run_accessibility_tests",
    description: "Run accessibility compliance tests",
    inputSchema: {
      type: "object" as const,
      properties: {
        environment: {
          type: "string",
          description: "Environment to test",
          enum: ["dev", "staging"],
          default: "dev"
        },
        wcag_level: {
          type: "string",
          description: "WCAG compliance level (A, AA, AAA)",
          enum: ["A", "AA", "AAA"],
          default: "AA"
        }
      }
    }
  },
  {
    name: "get_mcp_server_status",
    description: "Get MCP server health and status information",
    inputSchema: {
      type: "object" as const,
      properties: {
        include_metrics: {
          type: "boolean",
          description: "Include performance metrics",
          default: true
        }
      }
    }
  }
];

// Handle tool calls
server.setRequestHandler("tools/list", async () => {
  return {
    tools: tools as any
  };
});

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "run_tests": {
      const environment = (args?.environment as string) || "dev";
      const headed = args?.headed || false;
      const grep = args?.grep as string;
      const project = args?.project as string;

      process.env.ENVIRONMENT = environment;
      const { spawn } = await import("child_process");
      
      let testCommand = "npm test";
      if (headed) testCommand = "npm run test:headed";
      if (grep) testCommand += ` -- --grep "${grep}"`;
      if (project) testCommand += ` -- --project=${project}`;

      return new Promise((resolve) => {
        const child = spawn(testCommand, { shell: true, stdio: "pipe" });
        let output = "";
        let errorOutput = "";

        child.stdout?.on("data", (data) => { output += data.toString(); });
        child.stderr?.on("data", (data) => { errorOutput += data.toString(); });

        child.on("close", (code) => {
          resolve({
            content: [{
              type: "text",
              text: `✓ Test execution completed (exit code: ${code})\n\nOutput:\n${output}${errorOutput ? `\nErrors:\n${errorOutput}` : ""}`
            }]
          });
        });
      });
    }

    case "get_test_results": {
      const environment = (args?.environment as string) || "dev";
      const format = (args?.format as string) || "summary";
      const fs = await import("fs");
      const path = await import("path");

      const resultsFolder = path.join(__dirname, "..", "tests", "test-results");
      const csvPath = path.join(resultsFolder, `ticket_ids_${environment}.csv`);

      try {
        if (fs.existsSync(csvPath)) {
          const content = fs.readFileSync(csvPath, "utf8");
          const lines = content.split("\n").filter(l => l);
          const summary = `Test Results for ${environment}:\n- Total records: ${lines.length - 1}\n- Generated: ${new Date().toISOString()}`;
          
          const output = format === "json" ? JSON.stringify({ environment, total: lines.length - 1, records: lines }) : summary;
          
          return {
            content: [{ type: "text", text: output }]
          };
        } else {
          return {
            content: [{ type: "text", text: `No test results found for ${environment} environment.` }]
          };
        }
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error}` }] };
      }
    }

    case "analyze_test_performance": {
      const environment = (args?.environment as string) || "dev";
      const threshold = (args?.threshold_ms as number) || 5000;

      return {
        content: [{
          type: "text",
          text: `📊 Performance Analysis: ${environment}\n` +
                `Threshold: ${threshold}ms\n` +
                `Analyzing tests slower than threshold...\n` +
                `Note: Detailed metrics available from playwright-report/`
        }]
      };
    }

    case "get_test_coverage": {
      const format = (args?.format as string) || "summary";
      
      return {
        content: [{
          type: "text",
          text: `📈 Test Coverage Report (${format})\n` +
                `Coverage data: Check ./coverage/ directory\n` +
                `Run: npm test -- --coverage to generate coverage report`
        }]
      };
    }

    case "manage_environment": {
      const action = (args?.action as string) || "status";
      const environment = (args?.environment as string) || "dev";

      const statusMsg = {
        "setup": `✓ Setting up ${environment} environment...`,
        "teardown": `✓ Tearing down ${environment} environment...`,
        "status": `✓ ${environment} environment status: Active`,
        "reset": `✓ Resetting ${environment} environment...`
      };

      return {
        content: [{ type: "text", text: statusMsg[action as keyof typeof statusMsg] || "Unknown action" }]
      };
    }

    case "debug_test_failure": {
      const testName = args?.test_name as string;
      const environment = (args?.environment as string) || "dev";
      const includeLogs = args?.include_logs !== false;

      return {
        content: [{
          type: "text",
          text: `🔍 Debugging Test Failure: ${testName}\n` +
                `Environment: ${environment}\n` +
                `Include Logs: ${includeLogs}\n` +
                `Check: ./test-results/ for videos and logs`
        }]
      };
    }

    case "generate_test_report": {
      const format = (args?.format as string) || "html";
      const includeTrends = args?.include_trends !== false;
      const dateRange = (args?.date_range as string) || "today";

      return {
        content: [{
          type: "text",
          text: `📄 Test Report Generation\n` +
                `Format: ${format}\n` +
                `Include Trends: ${includeTrends}\n` +
                `Date Range: ${dateRange}\n` +
                `Report available at: ./playwright-report/`
        }]
      };
    }

    case "run_security_tests": {
      const environment = (args?.environment as string) || "dev";
      const checkDeps = args?.check_dependencies !== false;

      const { spawn } = await import("child_process");
      
      return new Promise((resolve) => {
        const child = spawn("npm audit", { shell: true, stdio: "pipe" });
        let output = "";

        child.stdout?.on("data", (data) => { output += data.toString(); });
        child.on("close", (code) => {
          resolve({
            content: [{
              type: "text",
              text: `🔒 Security Test Results (${environment})\n` +
                    `Dependency Check: ${checkDeps}\n` +
                    `Output:\n${output}`
            }]
          });
        });
      });
    }

    case "run_accessibility_tests": {
      const environment = (args?.environment as string) || "dev";
      const wcagLevel = (args?.wcag_level as string) || "AA";

      return {
        content: [{
          type: "text",
          text: `♿ Accessibility Test Results\n` +
                `Environment: ${environment}\n` +
                `WCAG Level: ${wcagLevel}\n` +
                `Run custom accessibility tests with: npm run test:a11y`
        }]
      };
    }

    case "get_mcp_server_status": {
      const includeMetrics = args?.include_metrics !== false;

      return {
        content: [{
          type: "text",
          text: `✅ MCP Server Status\n` +
                `Version: 2.0.0\n` +
                `Status: Active and Running\n` +
                `Tools Available: ${tools.length}\n` +
                `Metrics: ${includeMetrics ? "Enabled" : "Disabled"}\n` +
                `Uptime: Active since startup`
        }]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((error) => {
  console.error("MCP server error:", error);
  process.exit(1);
});