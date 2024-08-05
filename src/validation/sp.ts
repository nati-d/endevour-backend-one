import joi from "joi";

const ARRAY_OF_STRINGS = joi.array().items(joi.string());
const ARRAY_OF_NUMBERS = joi.array().items(joi.number());

const createSp = joi.object({
  name: joi.string().required(),
  email: joi.string(),
  about: joi.string().required(),
  password: joi.string().required(),
  category: ARRAY_OF_NUMBERS,
  service_category: joi.string().required(),
  website: joi.string().allow(null),
  company: joi.string(),
  address: joi.string(),
});

const updateSp = joi.object({
  id: joi.number(),
  email: joi.string(),
  phone: joi.string().length(12),
  about: joi.string(),
  password: joi.string(),
  category: joi.string(),
  service_category: joi.string().required(),
});

export default {
  createSp,
  updateSp,
};
