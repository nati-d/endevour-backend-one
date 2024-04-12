"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const library_1 = require("@prisma/client/runtime/library");
const updateTag = async (req, res) => {
    const { new_tag, old_tag } = req.body;
    try {
        const updatedTag = await prismaClient_1.default.tag.update({
            data: {
                name: new_tag,
            },
            where: {
                name: old_tag,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Tag updated successfully.", updatedTag));
    }
    catch (error) {
        console.log(error);
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res
                    .status(400)
                    .json(new response_1.default(false, "Tag already exist!"));
            }
            if (error.code === "P2025")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Invalide old tag name. Old tag name does not exist."));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to update tag!", null, error));
    }
};
exports.default = updateTag;
