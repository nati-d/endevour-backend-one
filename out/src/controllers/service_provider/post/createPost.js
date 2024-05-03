"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    // console.log("**body: ", req.body)
    // console.log("**auth: ", req.auth)
    try {
        let post = await index_1.default.client.service_provider_post.create({
            data: {
                posted_by: req.auth.id,
                description: req.body.description,
                body: req.body.body,
            }
        });
        return res.status(201).json(new response_1.default(true, "post created successfully", post));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request", error));
    }
};
