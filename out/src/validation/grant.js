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
const createGrant = joi_1.default.object({
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    thumbnail: joi_1.default.string(),
    body: joi_1.default.string().required(),
    opportunity_number: joi_1.default.string().required(),
    cfda: joi_1.default.string().required(),
    tags: ARRAY_OF_STRINGS
});
const getGrant = joi_1.default.object({
    id: joi_1.default.number(),
    title: joi_1.default.string(),
    date: RANGE_OF_DATE,
    tags: ARRAY_OF_STRINGS
});
const updateGrant = joi_1.default.object({
    id: joi_1.default.number().required(),
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    thumbnail: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    opportunity_number: joi_1.default.string().required(),
    cfda: joi_1.default.string().required(),
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS
});
const deleteGrant = joi_1.default.object({
    id: joi_1.default.number().required()
});
exports.default = {
    createGrant,
    getGrant,
    updateGrant,
    deleteGrant,
};
