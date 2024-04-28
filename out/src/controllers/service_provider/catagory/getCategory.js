"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        const catatories = await index_1.default.client.service_provider_category.findMany({
            where: {
                name: req.params.name,
                verified_by: parseInt(req.params.verified_by) || undefined
            }
        });
        res.send(new response_1.default(true, "data fetched successfully", catatories));
    }
    catch (error) {
        return res.status(500).send(new response_1.default(false, 'Unknown error while fetching data', error));
    }
};
