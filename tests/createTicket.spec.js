"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importStar(require("@playwright/test"));
const utils_1 = require("../Utils/utils");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const endpoints_json_1 = __importDefault(require("../resources/Data/endpoints.json"));
const resultsFolder = path_1.default.join(__dirname, 'test-results');
if (!fs_1.default.existsSync(resultsFolder))
    fs_1.default.mkdirSync(resultsFolder);
const REQUESTS_PER_10_SECONDS = 20;
const WINDOW_MS = 20000;
const INTERVAL_MS = Math.ceil(WINDOW_MS / REQUESTS_PER_10_SECONDS);
const rateLimitWait = async () => new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
var filtersRecords = [];
const filters = new Map([
    ["Scenario", 'create ticket']
]);
filtersRecords = (0, utils_1.getTestData)(filters, 'resources/Data/createTickets.csv');
test_1.default.beforeAll(() => {
    // Clean up old test results
    const devCsvPath = path_1.default.join(resultsFolder, 'ticket_ids_dev.csv');
    const stagingCsvPath = path_1.default.join(resultsFolder, 'ticket_ids_staging.csv');
    if (process.env.ENVIRONMENT === 'staging') {
        if (fs_1.default.existsSync(stagingCsvPath))
            fs_1.default.unlinkSync(stagingCsvPath);
    }
    else {
        if (fs_1.default.existsSync(devCsvPath))
            fs_1.default.unlinkSync(devCsvPath);
    }
});
test_1.default.describe('Create Tickets', () => {
    test_1.default.describe.configure({ mode: 'serial' });
    for (const record of filtersRecords) {
        (0, test_1.default)(`CreateTicket: ${record.TicketName}`, async () => {
            const envValue = process.env.ENVIRONMENT;
            if (!envValue || !(envValue in endpoints_json_1.default)) {
                throw new Error(`Invalid ENVIRONMENT value: ${envValue}`);
            }
            const environment = envValue;
            console.log("url: ", endpoints_json_1.default[environment].host);
            const apiContext = await test_1.request.newContext({
                baseURL: endpoints_json_1.default[environment].host,
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${endpoints_json_1.default[environment].AUTH_API_TOKEN}`, // Replace with your auth if needed
                },
            });
            // 2. Define the request body
            const requestBody = {
                ticket: {
                    subject: record.TicketSummary,
                    comment: {
                        body: record.TicketDescription
                    },
                    requester: {
                        name: "Arjun",
                        email: "arjun@orx.ai"
                    }
                }
            };
            // 3. Send POST request
            const response = await apiContext.post('/api/v2/tickets.json', {
                data: requestBody
            });
            // 4. Assert response status
            (0, test_1.expect)(response.status()).toBe(201); // or 200 depending on API
            // 5. Optional: parse response and check
            const responseBody = await response.json();
            console.log(responseBody);
            (0, test_1.expect)(responseBody.ticket).toBeDefined();
            const ticketId = responseBody.ticket.id; // adjust according to API response structure
            let csvPath = path_1.default.join(resultsFolder, 'ticket_ids_dev.csv');
            if (process.env.ENVIRONMENT === 'staging') {
                csvPath = path_1.default.join(resultsFolder, 'ticket_ids_staging.csv');
            }
            // If file doesn't exist, add header
            if (!fs_1.default.existsSync(csvPath)) {
                fs_1.default.writeFileSync(csvPath, 'Scenario,ticket_id\n', 'utf8');
            }
            fs_1.default.appendFileSync(csvPath, `Get Ticket,${ticketId}\n`, 'utf8');
            await rateLimitWait();
        });
    }
});
//# sourceMappingURL=createTicket.spec.js.map