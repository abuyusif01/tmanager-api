const { validationResult } = require('express-validator');
const { Task } = require('../../server/models');

/**
 * Get all tasks.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Create a new task.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed } = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            completed: completed || false,
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Get a task by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Update a task by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.update({
            "title": title,
            "description": description,
            "completed": completed || false,
        });
        
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Delete a task by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
