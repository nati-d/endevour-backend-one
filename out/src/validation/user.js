"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.userSignupSchema = exports.locationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.locationSchema = joi_1.default.object({
    x: joi_1.default.number().required(),
    y: joi_1.default.number().required()
});
exports.userSignupSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.string().pattern(/^\d{1,}$/),
    location: joi_1.default.string(),
    password: joi_1.default.string().min(8).required(),
});
exports.update = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone_number: joi_1.default.string().pattern(/^\d{1,}$/),
    location: joi_1.default.string(),
});
exports.default = { userSignupSchema: exports.userSignupSchema, update: exports.update };
