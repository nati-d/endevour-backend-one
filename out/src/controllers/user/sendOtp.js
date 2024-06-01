"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const random_js_1 = require("random-js");
const response_1 = __importDefault(require("../../types/response"));
const sendEmailConfig_1 = __importDefault(require("../../configs/sendEmailConfig"));
exports.default = async (req, res) => {
    let userOpt;
    let optCode;
    try {
        const random = new random_js_1.Random(random_js_1.MersenneTwister19937.autoSeed());
        optCode = random.integer(100000, 999999);
        console.log('random: ', optCode);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        userOpt = await prisma_1.default.client.user_opts.create({
            data: {
                email: req.body.email,
                opt_code: optCode.toString(),
            }
        });
        console.log('user opt:', userOpt);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        const subject = "opt code for email verification";
        const html = `<h1>${optCode}</h1>`;
        await (0, sendEmailConfig_1.default)(req.body.email, subject, html);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    return res.status(200).json(new response_1.default(true, "opt code has been sent to email successfully"));
};
