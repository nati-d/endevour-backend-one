import joi from 'joi';

const ARRAY_OF_STRINGS = joi.array().items(joi.string());
const ARRAY_OF_NUMBERS = joi.array().items(joi.number());

const createSp = joi.object({
    name: joi.string().required(),
    category: ARRAY_OF_NUMBERS,
    about: joi.string().required(),
    password: joi.string().required()
});

export default {
    createSp
}
