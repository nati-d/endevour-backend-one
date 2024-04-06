"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (sendTo, subject, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "endevour.org",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "info@endevour.org",
            pass: "Bwn#+AUS853W",
        },
    });
    return transporter.sendMail({
        from: "info@endevour.org",
        to: sendTo,
        subject: subject,
        html: html,
    });
};
exports.default = sendEmail;
