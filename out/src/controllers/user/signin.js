"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let user = req.user;
    try {
        if (user) {
            user = await prisma_1.default.client.user.findFirst({
                where: { user_credential: { credential_id: user.id, provider: user.provider } }
            });
        }
        else if (req.body) {
            user = await prisma_1.default.client.user.findFirst({
                where: { email: req.body.email }
            });
            if (!user)
                return res.status(400).json(new response_1.default(false, "user not found"));
            if (!bcrypt_1.default.compareSync(req.body.password, user.password))
                return res.status(401).json(new response_1.default(false, "incorrect email or password"));
        }
        else {
            return res.status(400).json(new response_1.default(false, "unable to authenticate user"));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, 'error while validating request'));
    }
    try {
        user.is_admin = false;
        delete user.password;
        const token = jsonwebtoken_1.default.sign(user, 'jwtprivatekey');
        return res.header('authorization', token).json(new response_1.default(true, 'successful log in', token));
    }
    catch (error) {
        console.error(error);
        return res.status(400).json(new response_1.default(false, 'invalid token'));
    }
};
