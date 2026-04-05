"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const test_1 = require("@playwright/test");
test_1.test.describe('Zendesk API', () => {
    (0, test_1.test)('list tickets (API)', async ({ request, baseURL }) => {
        const base = baseURL || process.env.ZENDESK_BASE_URL;
        if (!base)
            throw new Error('ZENDESK_BASE_URL is not set');
        const email = process.env.ZENDESK_EMAIL;
        const token = process.env.ZENDESK_API_TOKEN;
        if (!email || !token)
            throw new Error('ZENDESK_EMAIL or ZENDESK_API_TOKEN not set');
        const auth = Buffer.from(`${email}/token:${token}`).toString('base64');
        const res = await request.get(`${base.replace(/\/$/, '')}/api/v2/tickets.json`, {
            headers: { Authorization: `Basic ${auth}` },
        });
        (0, test_1.expect)(res.ok(), `unexpected status ${res.status()}`).toBeTruthy();
        const body = await res.json();
        (0, test_1.expect)(body).toBeTruthy();
    });
});
//# sourceMappingURL=api.spec.js.map