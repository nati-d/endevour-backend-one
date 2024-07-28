"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ARRAY_OF_STRINGS = joi_1.default.array().items(joi_1.default.string());
const CONTRACT_TYPE_SET = joi_1.default
    .string()
    .valid("REMOTE", "PARTIME", "FULLTIME", "CONTRACT");
const CURRENCY_SET = joi_1.default.string().valid("DOLLAR", "BIRR", "EURO", "");
const PERIODICITY_SET = joi_1.default
    .string()
    .valid("HOURLY", "MONTHLY", "WEEKLY", "DAILY");
const RANGE_OF_PERIODICITY = joi_1.default.array().items(PERIODICITY_SET);
const RANGE_OF_CONTRACT_TYPE = joi_1.default.array().items(CONTRACT_TYPE_SET);
const RANGE_OF_JOB_CATEGORY = joi_1.default.array().items(joi_1.default.number());
const RANGE_OF_CURRENCY = joi_1.default.array().items(CURRENCY_SET);
const RANGE_OF_NUMBER = joi_1.default.object({
    lower_bound: joi_1.default.number().required(),
    upper_bound: joi_1.default.number().required(),
});
const RANGE_OF_DATE = joi_1.default.object({
    lower_bound: joi_1.default.date().iso().required(),
    upper_bound: joi_1.default.date().iso().required(),
});
const SALARY = joi_1.default.object({
    low_end: joi_1.default.number().positive().required(),
    high_end: joi_1.default.number().positive().required(),
    periodicity: RANGE_OF_PERIODICITY,
    currency: RANGE_OF_CURRENCY,
});
const jobPost = joi_1.default.object({
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi_1.default.number().integer().min(0).required(),
    category: joi_1.default.number().integer().min(1).required(),
    closing_date: joi_1.default.date().iso().required(),
    low_end: joi_1.default.number().positive(),
    high_end: joi_1.default.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    tags: ARRAY_OF_STRINGS,
});
const getJobPost = joi_1.default.object({
    id: joi_1.default.number(),
    contract_type: RANGE_OF_CONTRACT_TYPE,
    year_of_experience: RANGE_OF_NUMBER,
    category: RANGE_OF_JOB_CATEGORY,
    closing_date: RANGE_OF_DATE,
    salary: SALARY,
    created_at: RANGE_OF_DATE,
    page: joi_1.default.number().allow(null),
});
const updateJobPost = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi_1.default.number().integer().min(0).required(),
    category: joi_1.default.number().integer().min(1).required(),
    closing_date: joi_1.default.date().iso().required(),
    low_end: joi_1.default.number().positive(),
    high_end: joi_1.default.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS,
    verify: joi_1.default.boolean(),
});
const deleteJobPost = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
});
const jobCatagory = joi_1.default.object({
    name: joi_1.default.string().required(),
});
exports.default = {
    jobPost,
    getJobPost,
    updateJobPost,
    deleteJobPost,
    jobCatagory,
};
