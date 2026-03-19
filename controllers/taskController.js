const mongoose = require('mongoose');
const Task = require('../models/task')

// GET all tasks
const getAll = async (req, res) => {
    //#swagger.tags =['tasks']
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    
};

// GET single task
const getSingle = async (req, res) => {
    //#swagger.tags =['tasks']
    try {
        const task =await Task.findById(req.params.id);
        if (!task) {
            return res.status (404).json({message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({message: err.message });
    } 
};

//POST -create new tastk
const createTask = async(req, res) => {
    //#swagger.tags =['tasks']
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

//PUT update task
const updateTask = async(req, res) => {
    //#swagger.tags =['tasks']
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument: 'after', runValidators: true}
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

const deleteTask = async(req, res) => {
    //#swagger.tags =['tasks']
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll, 
    getSingle, 
    createTask, 
    updateTask, 
    deleteTask
};