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
const testresultsFolder = path_1.default.join(__dirname, 'test-results');
let resultsFolder = path_1.default.join(testresultsFolder, 'dev_failed');
if (process.env.ENVIRONMENT === 'staging') {
    resultsFolder = path_1.default.join(testresultsFolder, 'staging_failed');
    if (!fs_1.default.existsSync(resultsFolder)) {
        fs_1.default.mkdirSync(resultsFolder, { recursive: true });
    }
}
else {
    if (!fs_1.default.existsSync(resultsFolder)) {
        fs_1.default.mkdirSync(resultsFolder, { recursive: true });
    }
}
// test.beforeAll(() => {
//   // Clean up old test results
//   const devCsvPath = path.join(resultsFolder, 'ticket_ids_dev_failed.csv');
//   const stagingCsvPath = path.join(resultsFolder, 'ticket_ids_staging_failed.csv');
//   if(process.env.ENVIRONMENT === 'staging') {
//     if (fs.existsSync(stagingCsvPath)) fs.unlinkSync(stagingCsvPath);
//   } else {
//     if (fs.existsSync(devCsvPath)) fs.unlinkSync(devCsvPath);
//   }
// });
var filtersRecords = [];
const filters = new Map([
    ["Scenario", 'Get Ticket']
]);
if (process.env.ENVIRONMENT === 'staging') {
    filtersRecords = (0, utils_1.getTestData)(filters, 'tests/test-results/ticket_ids_staging.csv');
}
else {
    filtersRecords = (0, utils_1.getTestData)(filters, 'tests/test-results/ticket_ids_dev.csv');
}
for (const record of filtersRecords) {
    (0, test_1.default)(`GetTicket: ${record.ticket_id}`, async () => {
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
        // 3. Send GET request
        const response = await apiContext.get(`/api/lotus/tickets/${record.ticket_id}/conversations.json?include=users&sort_order=desc`);
        // 4. Assert response status
        (0, test_1.expect)(response.status()).toBe(200); // or 201 depending on API
        // 5. Optional: parse response and check
        const responseBody = await response.json();
        console.log(responseBody);
        (0, test_1.expect)(responseBody.conversations).toBeDefined();
        const fieldName = 'body'; // Replace with the actual field name
        const count = responseBody.conversations.filter((item) => item[fieldName] !== undefined).length;
        console.log(`Field "${fieldName}" appears:`, count, 'times');
        let foundExpectedValue = false;
        let testFailedDueToTimeDiff = false;
        let conversationTimes = [];
        const conversations = responseBody.conversations;
        if (!Array.isArray(conversations) || conversations.length === 0) {
            throw new Error("No conversations found");
        }
        const sorted = [...conversations].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        const oldest = sorted[0];
        const oldestTime = new Date(oldest.created_at).getTime();
        const MAX_DIFF_MS = 15 * 60 * 1000; // 5 minute
        let createdTimeDiff = new Date().getTime() - new Date(oldest.created_at).getTime();
        if (createdTimeDiff > MAX_DIFF_MS && count == 1)
            conversationTimes.push('Msg - 1: ' + (createdTimeDiff / (60 * 1000)));
        let invalidConversations = [];
        sorted.slice(1).forEach((item, index) => {
            const fieldValue = item[fieldName];
            if (fieldValue !== undefined && fieldValue !== null) {
                console.log(`Field "${fieldName}" value:`, fieldValue);
                if (String(fieldValue).includes("ORX AI")) {
                    console.log("Found the expected value in the field.");
                }
                else {
                    invalidConversations.push(`Msg - ${index + 2}: ${fieldValue}`);
                }
            }
            const diffMs = new Date(item.created_at).getTime() - oldestTime;
            if (diffMs > MAX_DIFF_MS) {
                let diffMinutes = Math.floor(diffMs / (60 * 1000));
                conversationTimes.push(`Msg - ${index + 2}: ${diffMinutes}`);
            }
        });
        let csvPath = path_1.default.join(resultsFolder, 'failedDueToTimeDiff_dev.csv');
        if (process.env.ENVIRONMENT === 'staging') {
            csvPath = path_1.default.join(resultsFolder, 'failedDueToTimeDiff_staging.csv');
        }
        if (conversationTimes.length > 0) {
            // If file doesn't exist, add header
            if (!fs_1.default.existsSync(csvPath)) {
                fs_1.default.writeFileSync(csvPath, 'ticket_id,created_at\n', 'utf8');
            }
            fs_1.default.appendFileSync(csvPath, `${record.ticket_id},${conversationTimes.join(',')}\n`, 'utf8');
        }
        let failedReasonCSV = path_1.default.join(resultsFolder, 'invalidConversations_dev.csv');
        if (process.env.ENVIRONMENT === 'staging') {
            failedReasonCSV = path_1.default.join(resultsFolder, 'invalidConversations_staging.csv');
        }
        if (invalidConversations.length > 0) {
            // If file doesn't exist, add header
            if (!fs_1.default.existsSync(failedReasonCSV)) {
                fs_1.default.writeFileSync(failedReasonCSV, 'ticket_id,Reason,Conversation\n', 'utf8');
            }
            fs_1.default.appendFileSync(failedReasonCSV, `${record.ticket_id},'Invalid Conversation',${invalidConversations.join(',')}\n`, 'utf8');
        }
        if (invalidConversations.length > 0 || count < 3) {
            test_1.default.fail(true, `Test failed for ticket_id: ${record.ticket_id}. Time difference issue: ${testFailedDueToTimeDiff}, Found expected value: ${foundExpectedValue}, Field count: ${count}`);
        }
    });
}
//# sourceMappingURL=getTicket.spec.js.map