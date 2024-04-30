"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmailConfig_1 = __importDefault(require("../configs/sendEmailConfig"));
const response_1 = __importDefault(require("../types/response"));
const sendEmail = async (req, res) => {
    const { sendTo, subject, html, file, otherData, queryOnFail, resMessage, statusCode, } = req.emailData;
    try {
        if (file)
            await (0, sendEmailConfig_1.default)(sendTo, subject, html, file);
        else
            await (0, sendEmailConfig_1.default)(sendTo, subject, html);
        return res
            .status(statusCode || 201)
            .json(new response_1.default(true, resMessage || "Email send successfully.", otherData));
    }
    catch (error) {
        console.log(error);
        if (queryOnFail)
            queryOnFail();
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to send email. please try again!", null, error));
    }
};
exports.default = sendEmail;
