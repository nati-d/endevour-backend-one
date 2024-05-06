"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        let post = await index_1.default.client.service_provider_post.findFirst({
            where: { id: (0, lodash_1.parseInt)(req.query.id) }
        });
        return res.status(200).json(new response_1.default(true, "data fetched successfully", post));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
