import joi from "joi";

const jobPost = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    contract_type: joi.string().valid("REMOTE", "PARTIME", "FULLTIME", "CONTRACT").required(),
    year_of_experience: joi.number().integer().min(0).required(),
    thumbnail: joi.string().uri().required(),
    category: joi.number().integer().min(1).required(),
    closing_date: joi.date().iso().required(),
    verified_at: joi.date().iso().required(),
    verified_by: joi.number().integer().min(1).allow(null).required(),
    posted_by: joi.number().integer().min(1).allow(null).required(),
    auth: joi.object()
});

const jobCatagory = joi.object({
    name: joi.string().required(),
    auth: joi.object()
});

const deleteJobPost = joi.object({
    id: joi.number().positive().required(),
    auth: joi.object().required()
});

export default {
    jobPost,
    deleteJobPost,
    jobCatagory

}
