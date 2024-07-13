"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    let postToBeDeleted;
    let postId = (0, lodash_1.parseInt)(req.query.id);
    try {
        postToBeDeleted = await index_1.default.client.service_provider_post.findUnique({ where: { id: postId } });
        if (!postToBeDeleted)
            return res.status(404).json(new response_1.default(false, "post to be deleted not found"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        if (postToBeDeleted.posted_by != req.auth.id)
            return res.status(403).json(new response_1.default(false, "not allowed to delete the provided post"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        let result = await index_1.default.client.service_provider_post.delete({ where: { id: postId } });
        return res.status(204).json(new response_1.default(true, "post has been deleted successfully", result));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
