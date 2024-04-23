"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const deleteExclusiveJob = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.exclusive_job.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res
            .status(204)
            .json(new response_1.default(false, "Deleted successfully."));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to delete job!", null, error));
    }
};
exports.default = deleteExclusiveJob;
