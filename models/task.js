const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    status: {type: String, default: 'pending' },
    priority: {type: String, default: 'medium' },
    dueDate: {type: Date },
    userId: {type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);