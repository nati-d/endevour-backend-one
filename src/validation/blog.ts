import joi from "joi";

const ARRAY_OF_STRINGS = joi.array().items(joi.string());
const RANGE_OF_DATE = joi.object({
    lower_bound: joi.date().iso(),
    upper_bound: joi.date().iso()
});

const createBlog = joi.object({
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    tags: ARRAY_OF_STRINGS
});

const getBlog = joi.object({
    id: joi.number(),
    title: joi.string(),
    posted_by: joi.number().allow(null),
    tags: ARRAY_OF_STRINGS,
    date: RANGE_OF_DATE
})

const updateBlog = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    overview: joi.string().required(),
    body: joi.string().required(),
    tags: ARRAY_OF_STRINGS,
    tags_to_remove: ARRAY_OF_STRINGS
});

const deleteBlog = joi.object({
    id: joi.number().required()
})

export default {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}
