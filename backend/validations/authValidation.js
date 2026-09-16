import Joi from "joi";

export const registerUserSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required(),
    
    lastName: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required(),

    email: Joi.string()
        .email()
        .max(254)
        .required(),

    password: Joi.string()
        .min(8)
        .max(72) //as bcrypt use only first 72 characters 
        .required(),
});


export const loginUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .max(254)
        .required(),
    
    password: Joi.string()
        .min(8)
        .max(72)
        .required()
});