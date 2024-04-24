"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const library_1 = require("@prisma/client/runtime/library");
const updateExclusiveJob = async (req, res) => {
    try {
        const { description, closing_date } = req.body;
        const { id } = req.params;
        const updatedExclusiveJob = await prismaClient_1.default.exclusive_job.update({
            where: {
                id: parseInt(id),
            },
            data: {
                description: description ? description : undefined,
                closing_date: closing_date ? closing_date : undefined,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Exclusive job updated successfully.", updatedExclusiveJob));
    }
    catch (error) {
        console.log(error);
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                return res.status(400).json(new response_1.default(false, "Invalid job id"));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Error while updating exclusive job!", null, error));
    }
};
exports.default = updateExclusiveJob;
