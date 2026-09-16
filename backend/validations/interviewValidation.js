import Joi from "joi";

export const startInterviewSchema = Joi.object({
    role: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    experience: Joi.string()
        .valid("fresher", "junior", "mid", "senior")
        .required(),

    difficulty: Joi.string()
        .valid("easy", "medium", "hard")
        .required(),

    interviewType: Joi.string()
        .valid("Technical", "HR", "Behavioral")
        .required(),
});


export const submitAnswerSchema = Joi.object({
    answer: Joi.string()
        .trim()
        .min(1)
        .max(5000)
        .required(),
});