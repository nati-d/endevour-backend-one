"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailConfig = (sendTo, subject, html, file) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "api.endevour.org",
        port: 465,
        secure: true,
        auth: {
            user: "test@api.endevour.org",
            pass: "!I}mul~=Az9.",
        },
    });
    return transporter.sendMail({
        from: "test@api.endevour.org",
        to: sendTo,
        subject: subject,
        html: html,
        attachments: file,
    });
};
exports.default = sendEmailConfig;
