import joi from "joi";

const ARRAY_OF_STRINGS = joi.array().items(joi.string());
const RANGE_OF_DATE = joi.object({
    lower_bound: joi.date().iso(),
    upper_bound: joi.date().iso()
});


const createGrant = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    opportunity_number: joi.string().required(),
    cfda: joi.string().required(),
    tags: ARRAY_OF_STRINGS
});

const getGrant = joi.object({
    id: joi.number(),
    title: joi.string(),
    date: RANGE_OF_DATE,
    opportunity_number: joi.string(),
    cfda: joi.string(),
    tags: ARRAY_OF_STRINGS,
    page: joi.number(),
});

const updateGrant = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    opportunity_number: joi.string().required(),
    cfda: joi.string().required(),
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS
});

const deleteGrant = joi.object({
    id: joi.number().required()
});

export default {
    createGrant,
    getGrant,
    updateGrant,
    deleteGrant,
}
