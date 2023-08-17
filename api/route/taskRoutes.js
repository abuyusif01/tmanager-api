const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Corrected path
const validateMiddleware = require('../middlewares/validateMiddleware');

// Define routes and associate middleware and controllers
router.get('/tasks/', taskController.getAllTasks);
router.post('/task/', validateMiddleware.validateTask, taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.patch('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
