"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ARRAY_OF_STRINGS = joi_1.default.array().items(joi_1.default.string());
const ARRAY_OF_NUMBERS = joi_1.default.array().items(joi_1.default.number());
const createSp = joi_1.default.object({
    name: joi_1.default.string().required(),
    category: ARRAY_OF_NUMBERS,
    about: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.default = {
    createSp
};
