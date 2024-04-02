import Joi from 'joi';

const locationSchema = Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required()
});

const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().pattern(/^\d{12}$/),
    location: locationSchema,
    password: Joi.string().min(8).required()
});

export default schema;
