"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const sendEmail_1 = __importDefault(require("../../services/notifications/sendEmail"));
const forgotPassword = async (req, res) => {
    const email = req.body.email;
    try {
        const checkAdmin = await prismaClient_1.default.admin.findUnique({
            where: {
                email: email,
            },
        });
        if (!checkAdmin)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalid email. Admin does not exist with this email."));
        const confirmationCode = Math.floor(Math.random() * 10000) + 1;
        const insertCode = await prismaClient_1.default.admin_pass_reset.create({
            data: {
                admin_id: checkAdmin?.id,
                confirmation_code: confirmationCode,
            },
        });
        if (insertCode) {
            (0, sendEmail_1.default)(email, "Password Reset Code.", "Don't share it to anyone.", `<p> Confirmation code</p>: <b>${confirmationCode}</b>`);
            return res
                .status(201)
                .json(new response_1.default(true, "Confirmation code has been send successfully.", { codeId: insertCode.id, userId: checkAdmin.id }));
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong while sending confirmation code please try again. "));
    }
};
exports.default = forgotPassword;
