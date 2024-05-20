"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword_1 = __importDefault(require("../../helpers/hashPassword"));
const PasswordValidation = joi_1.default.object({
    old_password: joi_1.default.string().min(6).max(32).required(),
    new_password: joi_1.default.string().min(6).max(32).required(),
    confirm_password: joi_1.default.string().min(6).max(32).required(),
});
const changePassword = async (req, res) => {
    try {
        const { error } = PasswordValidation.validate(req.body);
        if (error)
            return res.status(400).json(new response_1.default(false, error.message));
        const { old_password, new_password, confirm_password } = req.body;
        if (new_password !== confirm_password)
            return res
                .status(400)
                .json(new response_1.default(false, "New password and confirm password does't mutch."));
        const getAdmin = await prismaClient_1.default.admin.findFirst({
            where: {
                id: parseInt(req.auth.id),
            },
        });
        if (!getAdmin)
            return res.status(404).json(new response_1.default(false, "Can't find admin!"));
        const passwordAuth = await bcrypt_1.default.compare(old_password, getAdmin.password);
        if (!passwordAuth)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide  password!"));
        const hashedPassword = await (0, hashPassword_1.default)(new_password);
        const updatePassword = await prismaClient_1.default.admin.update({
            data: {
                password: hashedPassword,
            },
            where: {
                id: parseInt(req.auth.id),
            },
        });
        if (!updatePassword)
            return res.status(404).json(new response_1.default(false, "Can't find admin!"));
        return res
            .status(200)
            .json(new response_1.default(true, "Password updated successfully."));
    }
    catch (error) { }
};
exports.default = changePassword;
