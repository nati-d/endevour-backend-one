"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const deleteFeadback = async (req, res) => {
    try {
        const { feadback_id } = req.params;
        await prismaClient_1.default.customer_feadbacks.delete({
            where: {
                id: parseInt(feadback_id),
            },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.log(error);
        return res.status(204).send();
    }
};
exports.default = deleteFeadback;
