const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');
const validateObjectId = require('../middleware/validateObjectId');

/**
 * GET all users
 */
router.get('/',
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Get all users'
    */
    userController.getAll);

/**
 * GET single user
 */
router.get('/:id', 
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Get a single user by ID'
    */
    validateObjectId, userController.getSingle);

/**
 * CREATE user
 */
router.post('/', 
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Create a new user'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@email.com',
        }
    }
    */
    validateUser.validateCreate, userController.createUser);

/**
 * UPDATE user
 */
router.put('/:id', 
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Update a user'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated user data',
        required: true,
        schema: {
            firstName: 'Jane',
        }
    }
    */
    validateObjectId, validateUser.validateUpdate, userController.updateUser);

/**
 * DELETE user
 */
router.delete('/:id', 
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Delete a user'
    */
    validateObjectId, userController.deleteUser);

module.exports = router;