"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let deletedJobPost;
    try {
        if (req.auth?.role == 'SUPER_ADMIN' || req.auth?.role == 'ADMIN') {
            deletedJobPost = await index_1.default.client.job_post.delete({
                where: { id: parseInt(req.query.id) }
            });
        }
        if (!req.auth.is_admin) {
            const jobToBeDeleted = await index_1.default.client.job_post.findFirst({ where: { id: parseInt(req.query.id) } });
            if (jobToBeDeleted?.posted_by == req.auth.id)
                deletedJobPost = await index_1.default.client.job_post.delete({
                    where: { id: parseInt(req.query.id) }
                });
        }
        return res.status(204).json(new response_1.default(true, "job post deleted successfully", deletedJobPost));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
                return res.status(404).json(new response_1.default(false, "resource to be deleted not found", error));
            if (error.code = "P2015") {
                return res.status(400).json(new response_1.default(false, 'Record to delete does not exist', error));
            }
        }
        console.error("Error while deleting job post:", error);
        return res.status(500).json(new response_1.default(false, "Unknown error at deleting job post", error));
    }
};
