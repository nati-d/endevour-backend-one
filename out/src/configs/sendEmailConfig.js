"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailConfig = (sendTo, subject, html, file) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "devidends.org",
        port: 465,
        secure: true,
        auth: {
            user: "opportunities@devidends.org",
            pass: "Lzg-5_)OQmEB",
        },
    });
    return transporter.sendMail({
        from: "opportunities@devidends.org",
        to: sendTo,
        subject: subject,
        html: html,
        attachments: file,
    });
};
exports.default = sendEmailConfig;
