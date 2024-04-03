import joi from "joi";

export const newAdmin = joi.object({
    first_name: joi.string().min(2).max(30).required(),
    last_name: joi.string().min(2).max(30).required(),
    email: joi.string().email(),
    phone_number: joi.string(),
    role: joi.string().valid("SUPER_ADMIN", "ADMIN"),
    password: joi.string().min(6).max(20),
    auth: joi.object(),
});

export const login = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6).max(20),
});

export default {
    newAdmin,
    login
}
