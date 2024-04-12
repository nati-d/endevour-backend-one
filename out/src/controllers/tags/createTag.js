"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const library_1 = require("@prisma/client/runtime/library");
const createTag = async (req, res) => {
    const { name } = req.body;
    const id = req.auth?.id;
    try {
        const createdTag = await prismaClient_1.default.tag.create({
            data: {
                name,
                verified_by: id,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Tag created successfully.", createdTag));
    }
    catch (error) {
        console.log(error);
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res
                    .status(400)
                    .json(new response_1.default(false, "Tag already exist!"));
            }
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to create tag!", null, error));
    }
};
exports.default = createTag;
