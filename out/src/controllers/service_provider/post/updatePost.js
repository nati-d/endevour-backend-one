"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    let postToBeUpdated;
    let postId = parseInt(req.body.id);
    try {
        postToBeUpdated = await index_1.default.client.service_provider_post.findUnique({ where: { id: postId } });
        if (!postToBeUpdated)
            return res.status(404).json(new response_1.default(false, "post to be updated not found"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        if (postToBeUpdated.posted_by != req.auth.id)
            return res.status(403).json(new response_1.default(false, "not allowed to update the provided post"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        let updatedPost = await index_1.default.client.service_provider_post.update({
            where: { id: postId },
            data: {
                body: req.body.body,
                description: req.body.description
            }
        });
        return res.status(201).json(new response_1.default(true, "post updated successfully", updatedPost));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
