import joi from "joi";

const ARRAY_OF_STRINGS = joi.array().items(joi.string());
const RANGE_OF_DATE = joi.object({
    lower_bound: joi.date().iso(),
    upper_bound: joi.date().iso()
});


const createNews = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    thumbnail: joi.string().required(),
    body: joi.string().required(),
    tags: ARRAY_OF_STRINGS
});

const getNews = joi.object({
    title: joi.string(),
    date: RANGE_OF_DATE,
    tags: ARRAY_OF_STRINGS
});

const updateNews = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    overview: joi.string().required(),
    thumbnail: joi.string().required(),
    body: joi.string().required(),
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS
});

const deleteNews = joi.object({
    id: joi.number().required()
});

export default {
    createNews,
    getNews,
    updateNews,
    deleteNews,
}
