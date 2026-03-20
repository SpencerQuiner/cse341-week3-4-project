const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');
const validateObjectId = require('../middleware/validateObjectId');

// GET all user
router.get('/', userController.getAll);

//GET single user
router.get('/:id', validateObjectId, userController.getSingle);

//Create user
router.post('/', validateUser.validateCreate, userController.createUser);

//Update user
router.put('/:id', validateObjectId, validateUser.validateUpdate, userController.createUser);

//delete user
router.delete('/:id', validateObjectId, userController.deleteUser);

module.exports = router;