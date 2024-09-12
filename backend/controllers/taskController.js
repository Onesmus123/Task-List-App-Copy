// backend/controllers/taskController.js

// Import the Task model
const Task = require('../models/taskModel');

// Function to get all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }); // Find tasks associated with the logged-in user
        res.json(tasks); // Send tasks as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to get a task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // Find task by ID
        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Handle task not found
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' }); // Handle unauthorized access
        }
        res.json(task); // Send task as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to create a new task
const createTask = async (req, res) => {
    const { title, description, deadline, status = 'in-progress' } = req.body; // Default status to 'in-progress'
    try {
        const task = new Task({
            title,
            description,
            deadline,
            status, // Include status in task creation
            user: req.user._id,
        });
        const createdTask = await task.save(); // Save the new task to the database
        res.status(201).json(createdTask); // Send created task as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to update a task by ID
const updateTask = async (req, res) => {
    const { title, description, deadline, status } = req.body; // Include status in update
    try {
        const task = await Task.findById(req.params.id); // Find task by ID
        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Handle task not found
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' }); // Handle unauthorized access
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.deadline = deadline || task.deadline;
        task.status = status || task.status; // Update status if provided
        const updatedTask = await task.save(); // Save the updated task to the database
        res.json(updatedTask); // Send updated task as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // Find task by ID
        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Handle task not found
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' }); // Handle unauthorized access
        }
        await task.remove(); // Remove the task from the database
        res.json({ message: 'Task removed' }); // Send success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
