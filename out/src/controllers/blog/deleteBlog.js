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
        let blog;
        if (req.auth?.role == 'SUPER_ADMIN' || req.auth?.role == 'ADMIN')
            blog = await index_1.default.client.blog.delete({
                where: { id: parseInt(req.query.id) },
            });
        else if (!req.auth.is_admin) {
            const blogToBeDeleted = await index_1.default.client.blog.findFirst({ where: { id: parseInt(req.query.id) } });
            if (!blogToBeDeleted)
                return res.status(404).json(new response_1.default(false, "resource to be deleted no found"));
            if (blogToBeDeleted?.posted_by != req.auth.id)
                return res.status(403).json(new response_1.default(false, "not authorized to delete the resource"));
            blog = await index_1.default.client.blog.delete({
                where: { id: parseInt(req.query.id) },
            });
        }
        if (!blog)
            return res.status(404).json(new response_1.default(false, "resource to be deleted no found"));
        return res.status(204).json(new response_1.default(true, "blog deleted successfully", blog));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                return res.status(404).json(new response_1.default(false, "resource to be deleted not found", error));
        }
        return res.status(400).json(new response_1.default(false, "error while deleting blog", error));
    }
};
