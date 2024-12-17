const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
    });
    return registerSchema.validate(data);
}

const loginValidation = (data) => {
    const loginSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required()
    });
    return loginSchema.validate(data);
}

const taskValidation = (data) => {
    const taskSchema = Joi.object({
        title: Joi.string().max(255).required(),
        status: Joi.string().max(255).required(),
        priority: Joi.number().required(),
        dueDate: Joi.string().max(255).required()
    });
    return taskSchema.validate(data);
}

const userValidation = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(4).required()
    });
    return userSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.taskValidation = taskValidation;
module.exports.userValidation = userValidation;