"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const CONTRACT_TYPE_SET = joi_1.default.string().valid("REMOTE", "PARTIME", "FULLTIME", "CONTRACT");
const CURRENCY_SET = joi_1.default.string().valid("DOLLAR", "BIRR", "EURO");
const PERIODICITY_SET = joi_1.default.string().valid("HOURLY", "MONTHLY", "WEEKLY", "DAILY");
const jobPost = joi_1.default.object({
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi_1.default.number().integer().min(0).required(),
    thumbnail: joi_1.default.string().uri().required(),
    category: joi_1.default.number().integer().min(1).required(),
    closing_date: joi_1.default.date().iso().required(),
    low_end: joi_1.default.number().positive(),
    high_end: joi_1.default.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    auth: joi_1.default.object()
});
const updateJobPost = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi_1.default.number().integer().min(0).required(),
    thumbnail: joi_1.default.string().uri().required(),
    category: joi_1.default.number().integer().min(1).required(),
    closing_date: joi_1.default.date().iso().required(),
    low_end: joi_1.default.number().positive(),
    high_end: joi_1.default.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    auth: joi_1.default.object()
});
const deleteJobPost = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
    auth: joi_1.default.object().required()
});
const jobCatagory = joi_1.default.object({
    name: joi_1.default.string().required(),
    auth: joi_1.default.object()
});
exports.default = {
    jobPost,
    updateJobPost,
    deleteJobPost,
    jobCatagory
};
