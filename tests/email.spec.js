"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const test_1 = require("@playwright/test");
test_1.test.describe('Email Tests', () => {
    (0, test_1.test)('send email to Zendesk support address', async () => {
        const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO, } = process.env;
        test_1.test.skip(!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM || !EMAIL_TO, 'SMTP env vars not set');
        const transporter = nodemailer_1.default.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: SMTP_SECURE === 'true',
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
        const mailOptions = {
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: "Test ticket from Playwright",
            text: "Hello! This is an automated test email to create a ticket.",
            html: "<p>Hello! This is an automated test email to create a ticket.</p>",
        };
        const info = await transporter.sendMail(mailOptions);
        (0, test_1.expect)(info.messageId).toBeTruthy();
    });
});
//# sourceMappingURL=email.spec.js.map