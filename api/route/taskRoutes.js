// api/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Corrected path
const validateMiddleware = require('../middlewares/validateMiddleware');

// Define routes and associate middleware and controllers
router.get('/', taskController.getAllTasks);
router.post('/', validateMiddleware.validateTask, taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
