import joi from "joi";

const createNews = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    thumbnail: joi.string().required(),
    body: joi.string().required(),
    tags: joi.array().items(joi.string())
});

const getNews = joi.object({
    title: joi.string(),
    tags: joi.array().items(joi.string())
})

export default {
    createNews,
    getNews,
}
