"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    let user;
    try {
        user = await prisma_1.default.client.service_provider.findFirst({ where: { email: req.body.email } });
        if (!user)
            return res.status(400).json(new response_1.default(false, "username or password does not exist"));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new response_1.default(false, "error while authenticating user"));
    }
    try {
        if (!bcrypt_1.default.compareSync(req.body.password, user.password))
            return res.status(401).json(new response_1.default(false, "username or password does not exist"));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new response_1.default(false, "error while authenticating user"));
    }
    try {
        delete user.password;
        user.is_service_provider = true;
        let token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY);
        return res.status(200).header('authorization', token).json(new response_1.default(true, "you have successfully logged in", token));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new response_1.default(false, "error while authenticating user"));
    }
};
