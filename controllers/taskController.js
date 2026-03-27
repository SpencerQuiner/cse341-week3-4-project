const Task = require('../models/task')

// GET all tasks
const getAll = async (req, res, next) => {
    //#swagger.tags =['tasks']
    try {
        const userId = req.user?.id || req.headers['user-id'];
        const query = userId ? {userId} : {};
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500);
        next(err);
    }
    
};

// GET single task
const getSingle = async (req, res, next) => {
    //#swagger.tags =['tasks']
    try {
        const task =await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error('Task not found' );
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500);
        next(err);
    } 
};

//POST -create new tastk
const createTask = async(req, res, next) => {
    //#swagger.tags =['tasks']
    try {
        const userId = req.user?.id || req.headers['user-id'];
        const task = new Task({...req.body, userId});
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400)
        next(err);
    }
};

//PUT update task
const updateTask = async(req, res, next) => {
    //#swagger.tags =['tasks']
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument: 'after', runValidators: true}
        );
        if (!updatedTask) {
            res.status(404);
            throw new Error('Task not found' );
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

const deleteTask = async(req, res, next) => {
    //#swagger.tags =['tasks']
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            res.status(404);
            throw new Error('Task not found' );
        }

        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = {
    getAll, 
    getSingle, 
    createTask, 
    updateTask, 
    deleteTask
};