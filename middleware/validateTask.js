const Joi = require('joi');

const createSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date(),
    userId: Joi.string()
});

const validateCreate = (req, res, next) => {
    const {error} = createSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};

const updateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date(),
    userId: Joi.string()
}).min(1);

const validateUpdate = (req, res, next) => {
    const {error} = updateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};



module.exports = {
    validateCreate, 
    validateUpdate
};