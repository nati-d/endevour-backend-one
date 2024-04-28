"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        const category = await index_1.default.client.service_provider_category.findFirst({
            where: { name: req.query.name }
        });
        if (category)
            return res.status(200).json(new response_1.default(true, "service provider category fetched successfully", category));
        else
            return res.status(204).json(new response_1.default(false, "service provider category does not exit", category));
    }
    catch (error) {
        console.error(error);
        return res.status(400).json(new response_1.default(false, "error while getting service provider category", error));
    }
};
