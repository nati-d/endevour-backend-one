"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const response_1 = __importDefault(require("../../../../types/response"));
exports.default = async (req, res) => {
    let toBeDeleted;
    let where = {
        user: req.auth.id,
        organization: parseInt(req.query.id)
    };
    try {
        toBeDeleted = await prisma_1.default.client.saved_organization.findFirst({ where });
        if (!toBeDeleted)
            return res.status(404).json(new response_1.default(false, "resource to be deleted not found"));
        if (toBeDeleted.user != req.auth.id)
            return res.status(403).json(new response_1.default(false, "does not have access to give the code"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        await prisma_1.default.client.saved_organization.deleteMany({ where });
        return res.status(204).json(new response_1.default(true, "content deleted successfully"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
