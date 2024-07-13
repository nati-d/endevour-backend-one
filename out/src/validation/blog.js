"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ARRAY_OF_STRINGS = joi_1.default.array().items(joi_1.default.string());
const RANGE_OF_DATE = joi_1.default.object({
    lower_bound: joi_1.default.date().iso(),
    upper_bound: joi_1.default.date().iso()
});
const createBlog = joi_1.default.object({
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    tags: ARRAY_OF_STRINGS
});
const getBlog = joi_1.default.object({
    id: joi_1.default.number(),
    title: joi_1.default.string(),
    posted_by: joi_1.default.number().allow(null),
    verified_by: joi_1.default.number().allow(null),
    tags: ARRAY_OF_STRINGS,
    date: RANGE_OF_DATE,
    page: joi_1.default.number().allow(null)
});
const updateBlog = joi_1.default.object({
    id: joi_1.default.number().required(),
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS,
    verify: joi_1.default.boolean()
});
const deleteBlog = joi_1.default.object({
    id: joi_1.default.number().required()
});
exports.default = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
};
