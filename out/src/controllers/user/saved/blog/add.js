"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../../../types/response"));
exports.default = async (req, res) => {
    try {
        let saved = await prisma_1.default.client.saved_blog.create({
            data: {
                user: req.auth.id,
                blog: req.body.id
            }
        });
        return res.status(201).json(new response_1.default(true, "data saved successfully", saved));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code == 'P2002')
                return res.status(409).json(new response_1.default(false, "content already saved"));
            if (error.code == 'P2003')
                return res.status(404).json(new response_1.default(false, "resource to be saved does not exist"));
        }
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
