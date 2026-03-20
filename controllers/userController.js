const user = require('../models/user');
const User = require('../models/user')

// GET all users
const getAll = async (req, res, next) => {
    //#swagger.tags =['users']
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500);
        next(err);
    }
    
};

// GET single user
const getSingle = async (req, res, next) => {
    //#swagger.tags =['users']
    try {
        const user =await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found' );
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500);
        next(err);
    } 
};

//POST -create new user
const createUser = async(req, res, next) => {
    //#swagger.tags =['users']
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

//PUT update user
const updateUser = async(req, res, next) => {
    //#swagger.tags =['users']
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument: 'after', runValidators: true}
        );
        if (!updatedUser) {
            res.status(404);
            throw new Error('User not found' );
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

const deleteUser = async(req, res, next) => {
    //#swagger.tags =['users']
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            res.status(404);
            throw new Error('User not found' );
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = {
    getAll, 
    getSingle, 
    createUser, 
    updateUser, 
    deleteUser
};