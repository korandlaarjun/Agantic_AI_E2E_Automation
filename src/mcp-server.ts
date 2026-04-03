#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server";
import { CallToolRequest, ListToolsRequest } from "@modelcontextprotocol/server";
import { z } from "zod";

const server = new Server(
  {
    name: "ai-automation-e2e",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
const runTestsTool = {
  name: "run_tests",
  description: "Run the Playwright E2E tests",
  inputSchema: {
    type: "object" as const,
    properties: {
      environment: {
        type: "string",
        description: "Environment to run tests in (dev, staging)",
        default: "dev"
      },
      headed: {
        type: "boolean",
        description: "Run tests with browser visible",
        default: false
      }
    }
  }
};

const getTestResultsTool = {
  name: "get_test_results",
  description: "Get the latest test results",
  inputSchema: {
    type: "object" as const,
    properties: {
      environment: {
        type: "string",
        description: "Environment results to get (dev, staging)",
        default: "dev"
      }
    }
  }
};

// Handle tool calls
server.setRequestHandler("tools/list", async () => {
  return {
    tools: [runTestsTool, getTestResultsTool]
  };
});

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "run_tests": {
      const environment = (args?.environment as string) || "dev";
      const headed = args?.headed || false;

      // Set environment variable
      process.env.ENVIRONMENT = environment;

      // Run tests
      const { spawn } = await import("child_process");
      const testCommand = headed ? "npm run test:headed" : "npm test";

      return new Promise((resolve) => {
        const child = spawn(testCommand, { shell: true, stdio: "pipe" });

        let output = "";
        let errorOutput = "";

        child.stdout.on("data", (data) => {
          output += data.toString();
        });

        child.stderr.on("data", (data) => {
          errorOutput += data.toString();
        });

        child.on("close", (code) => {
          resolve({
            content: [
              {
                type: "text",
                text: `Test execution completed with exit code ${code}\n\nOutput:\n${output}\n\nErrors:\n${errorOutput}`
              }
            ]
          });
        });
      });
    }

    case "get_test_results": {
      const environment = (args?.environment as string) || "dev";
      const fs = await import("fs");
      const path = await import("path");

      const resultsFolder = path.join(__dirname, "..", "tests", "test-results");
      const csvPath = path.join(resultsFolder, `ticket_ids_${environment}.csv`);

      try {
        if (fs.existsSync(csvPath)) {
          const content = fs.readFileSync(csvPath, "utf8");
          return {
            content: [
              {
                type: "text",
                text: `Test results for ${environment}:\n\n${content}`
              }
            ]
          };
        } else {
          return {
            content: [
              {
                type: "text",
                text: `No test results found for ${environment} environment.`
              }
            ]
          };
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading test results: ${error}`
            }
          ]
        };
      }
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