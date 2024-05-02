import Joi from "joi";
const Recommender = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(32),
  phone_number: Joi.string().min(10).max(12),
}).unknown(true);

export default {
  Recommender,
};
