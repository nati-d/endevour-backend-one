"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        const category = await index_1.default.client.job_category.findFirst({
            where: { id: (0, lodash_1.parseInt)(req.query.id) }
        });
        if (category)
            return res.status(200).json(new response_1.default(true, "job category fetched successfully", category));
        else
            return res.status(204).json(new response_1.default(false, "job category does not exit", category));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to get job categories"));
        }
        return res.status(400).json(new response_1.default(false, "error while getting job category"));
    }
};
