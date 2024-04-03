import joi from "joi";

const CONTRACT_TYPE_SET = joi.string().valid("REMOTE", "PARTIME", "FULLTIME", "CONTRACT");
const CURRENCY_SET = joi.string().valid("DOLLAR", "BIRR", "EURO");
const PERIODICITY_SET = joi.string().valid("HOURLY", "MONTHLY", "WEEKLY", "DAILY");

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
    auth: joi.object()
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
    updateJobPost,
    deleteJobPost,
    jobCatagory

}
