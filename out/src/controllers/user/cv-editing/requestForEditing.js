"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../../types/response"));
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const requestForEditing = async (req, res) => {
    try {
        const userId = req.auth.id;
        const createdRequest = await prismaClient_1.default.cv_editing_requests.create({
            data: {
                user_id: userId,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Request created successfully.", createdRequest));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to create request please try again."));
    }
};
exports.default = requestForEditing;
