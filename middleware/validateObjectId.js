const Joi = require('joi');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const {id} = req.params;

    //check if the object id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }
    next();
};

module.exports = validateObjectId;