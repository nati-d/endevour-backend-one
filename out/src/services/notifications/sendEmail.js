"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (sendTo, subject, text, html) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "amanuelwt@gmail.com",
            pass: "aodf jxcc tack fahc",
        },
    });
    try {
        const info = await transporter.sendMail({
            from: "amanuelwt@gmail.com",
            to: sendTo, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
        console.log(info);
        return info;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.default = sendEmail;
