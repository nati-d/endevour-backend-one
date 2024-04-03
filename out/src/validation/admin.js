"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newAdmin = joi_1.default.object({
    first_name: joi_1.default.string().min(2).max(30).required(),
    last_name: joi_1.default.string().min(2).max(30).required(),
    email: joi_1.default.string().email(),
    phone_number: joi_1.default.string(),
    role: joi_1.default.string().valid("SUPER_ADMIN", "ADMIN"),
    password: joi_1.default.string().min(6).max(20),
    auth: joi_1.default.object(),
});
exports.login = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(6).max(20),
});
