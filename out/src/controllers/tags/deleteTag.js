"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const library_1 = require("@prisma/client/runtime/library");
const response_1 = __importDefault(require("../../types/response"));
const deleteTag = async (req, res) => {
    const { tag_name } = req.params;
    console.log(tag_name);
    try {
        await prismaClient_1.default.tag.delete({
            where: {
                name: tag_name,
            },
        });
        return res.status(204).end();
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Invalide old tag name. Old tag name does not exist."));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to delete tag!", null, error));
    }
};
exports.default = deleteTag;
