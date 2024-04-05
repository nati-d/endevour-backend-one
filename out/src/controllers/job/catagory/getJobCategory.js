"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
exports.default = async (req, res) => {
    try {
        const newCatagory = await index_1.default.client.job_category.findMany();
        res.send({
            success: true,
            message: "data fetched successfully",
            data: newCatagory,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Unknown error while fetching data',
            error: error,
        });
    }
};
