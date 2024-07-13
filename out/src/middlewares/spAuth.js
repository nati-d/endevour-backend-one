"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../types/response"));
exports.default = async (req, res, next) => {
    if (req.auth.is_service_provider) {
        next();
    }
    else {
        res.status(401).json(new response_1.default(false, "Access denied. lack service provider"));
    }
};
