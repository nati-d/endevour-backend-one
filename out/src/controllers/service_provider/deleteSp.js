"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        let deletedSp;
        if (req.auth?.role == 'SUPER_ADMIN' || req.auth?.role == 'ADMIN') {
            deletedSp = await index_1.default.client.service_provider.delete({
                where: { id: parseInt(req.query.id) }
            });
        }
        else if (!req.auth.is_admin) {
            const spToBeDeleted = await index_1.default.client.service_provider.findFirst({ where: { id: parseInt(req.query.id) } });
            if (spToBeDeleted?.id == req.auth.id)
                deletedSp = await index_1.default.client.service_provider.delete({
                    where: { id: parseInt(req.query.id) }
                });
        }
        return res.status(204).json(new response_1.default(true, "service provider deleted successfully", deletedSp));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                return res.status(404).json(new response_1.default(false, "resource to be deleted not found", error));
            if (error.code === "P2015") {
                return res.status(400).json(new response_1.default(false, 'Record to delete does not exist', error));
            }
        }
        console.error("Error while deleting job post:", error);
        return res.status(500).json(new response_1.default(false, "Unknown error at deleting job post", error));
    }
};
