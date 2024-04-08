import Joi from "joi";
const Recommender = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default {
  Recommender,
};
