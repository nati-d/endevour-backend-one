import joi from "joi";

const CONTRACT_TYPE_SET = joi.string().valid("REMOTE", "PARTIME", "FULLTIME", "CONTRACT");
const CURRENCY_SET = joi.string().valid("DOLLAR", "BIRR", "EURO");
const PERIODICITY_SET = joi.string().valid("HOURLY", "MONTHLY", "WEEKLY", "DAILY");
const RANGE_OF_PERIODICITY = joi.array().items(PERIODICITY_SET)
const RANGE_OF_CONTRACT_TYPE = joi.array().items(CONTRACT_TYPE_SET);
const RANGE_OF_JOB_CATEGORY = joi.array().items(joi.number());
const RANGE_OF_CURRENCY = joi.array().items(CURRENCY_SET);

const RANGE_OF_NUMBER = joi.object({
    lower_bound: joi.number().required(),
    upper_bound: joi.number().required()
});

const RANGE_OF_DATE = joi.object({
    lower_bound: joi.date().iso().required(),
    upper_bound: joi.date().iso().required()
});

const SALARY = joi.object({
    low_end: joi.number().positive().required(),
    high_end: joi.number().positive().required(),
    periodicity: RANGE_OF_PERIODICITY,
    currency: RANGE_OF_CURRENCY
});

const jobPost = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi.number().integer().min(0).required(),
    thumbnail: joi.string().uri().required(),
    category: joi.number().integer().min(1).required(),
    closing_date: joi.date().iso().required(),
    low_end: joi.number().positive(),
    high_end: joi.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    auth: joi.object().required()
});

const getJobPost = joi.object({
    contract_type: RANGE_OF_CONTRACT_TYPE,
    year_of_experience: RANGE_OF_NUMBER,
    category: RANGE_OF_JOB_CATEGORY,
    closing_date: RANGE_OF_DATE,
    salary: SALARY,
    auth: joi.object().required()
});

const updateJobPost = joi.object({
    id: joi.number().positive().required(),
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    contract_type: CONTRACT_TYPE_SET,
    year_of_experience: joi.number().integer().min(0).required(),
    thumbnail: joi.string().uri().required(),
    category: joi.number().integer().min(1).required(),
    closing_date: joi.date().iso().required(),
    low_end: joi.number().positive(),
    high_end: joi.number().positive(),
    periodicity: PERIODICITY_SET,
    currency: CURRENCY_SET,
    auth: joi.object()
})

const deleteJobPost = joi.object({
    id: joi.number().positive().required(),
    auth: joi.object().required()
});

const jobCatagory = joi.object({
    name: joi.string().required(),
    auth: joi.object()
});

export default {
    jobPost,
    getJobPost,
    updateJobPost,
    deleteJobPost,
    jobCatagory

}
