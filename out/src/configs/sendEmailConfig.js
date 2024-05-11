"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailConfig = (sendTo, subject, html, file) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "endevour.org",
        port: 468,
        secure: true,
        auth: {
            user: "info@endevour.org",
            pass: "NRyo187uvFMp",
        },
    });
    return transporter.sendMail({
        from: "info@endevour.org",
        to: sendTo,
        subject: subject,
        html: html,
        attachments: file,
    });
};
exports.default = sendEmailConfig;
