"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const getPostUrl = async (req, res) => {
    if (!req.file)
        return res
            .status(400)
            .json(new response_1.default(false, "Invalide content provided"));
    const file = req.file.filename;
    return res
        .status(200)
        .json(new response_1.default(true, `https://api.endevour.org/public/posts/${file}`));
};
exports.default = getPostUrl;
