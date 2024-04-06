"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const sendEmail_1 = __importDefault(require("../notifications/sendEmail"));
const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const type = req.body.type;
    let user;
    if (type !== "admin" && type !== "user")
        return res
            .status(400)
            .json(new response_1.default(false, "You inserted invalid type."));
    try {
        let getUser;
        if (type === "admin") {
            getUser = await prismaClient_1.default.admin.findUnique({
                where: {
                    email: email,
                },
            });
        }
        else {
            getUser = await prismaClient_1.default.user.findUnique({
                where: {
                    email: email,
                },
            });
        }
        if (!getUser)
            return res.status(400).json(new response_1.default(false, "Invalid email."));
        else
            user = getUser;
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong checking user. "));
    }
    const confirmationCode = Math.floor(Math.random() * 10000) + 1;
    try {
        await (0, sendEmail_1.default)(email, "Password Reset Code.", `<p> Confirmation code</p>: <b>${confirmationCode}</b>`);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to send confirmation code please try later."));
    }
    try {
        const insertCode = await prismaClient_1.default.password_reset.create({
            data: {
                email,
                confirmation_code: confirmationCode,
            },
        });
        return res.status(201).json(new response_1.default(true, "Confirmation code has been send successfully.", {
            codeId: insertCode.id,
            userId: user.email,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed while managing confirmation code"));
    }
};
exports.default = forgotPassword;
