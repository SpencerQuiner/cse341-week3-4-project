const Joi = require('joi');

const createSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
});

const updateSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email()
}).min(1);

const validateCreate = (req, res, next) => {
    const {error} = createSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};

const validateUpdate = (req, res, next) => {
    const {error} = updateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};

module.exports = {validateCreate, validateUpdate};