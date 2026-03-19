const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

/**
 * GET all tasks
 */
router.get('/', 
    /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Get all tasks'
    */
    taskController.getAll
);

/**
 * GET single task
 */
router.get('/:id', 
    /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Get a single task by ID'
    */
    taskController.getSingle
);

/**
 * CREATE task
 */
router.post('/', 
    /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Create a new task'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Task data',
        required: true,
        schema: {
            title: 'Sample Task',
            description: 'Task description',
            status: 'pending',
            priority: 'medium',
            dueDate: '2026-03-20',
            userId: '12345'
        }
    }
    */
    taskController.createTask
);

/**
 * UPDATE task
 */
router.put('/:id', 
    /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Update a task'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated task data',
        required: true,
        schema: {
            title: 'Updated Task',
            description: 'Updated description'
        }
    }
    */
    taskController.updateTask
);

/**
 * DELETE task
 */
router.delete('/:id', 
    /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Delete a task'
    */
    taskController.deleteTask
);

module.exports = router;