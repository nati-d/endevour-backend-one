"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getTags = async (req, res) => {
    const tag_name = req.body.tag_name;
    try {
        const tags = await prismaClient_1.default.tag.findMany({
            where: {
                name: tag_name,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Tags getted successfully.", tags));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get tags!", null, error));
    }
};
exports.default = getTags;
