import Joi from 'joi';

export const locationSchema = Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required()
});

export const userSignupSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().pattern(/^\d{1,}$/),
    location: Joi.string(),
    password: Joi.string().min(8).required(),
});

export const update = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().pattern(/^\d{1,}$/),
    location: Joi.string(),
});

export default { userSignupSchema, update };
