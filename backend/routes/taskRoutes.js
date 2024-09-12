// backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { title, description, deadline, status = 'in-progress' } = req.body;
  
  if (!title || !description || !deadline) {
    res.status(400);
    throw new Error('Please provide title, description, and deadline');
  }

  const task = await Task.create({
    title,
    description,
    deadline,
    status, // Include status in task creation
    user: req.user._id
  });

  res.status(201).json(task);
}));

// @desc    Get all tasks for a user with optional filtering and sorting
// @route   GET /api/tasks
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const { status, sort, search } = req.query;

  let query = { user: req.user._id };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }

  let tasks = await Task.find(query);

  if (sort) {
    tasks = tasks.sort((a, b) => {
      if (sort === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sort === 'priority') {
        return a.priority - b.priority;
      }
      return 0;
    });
  }

  res.status(200).json(tasks);
}));

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const { title, description, deadline, status } = req.body;
  
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this task');
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.deadline = deadline || task.deadline;
  task.status = status || task.status; // Update status if provided

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
}));

// @desc    Mark a task as completed
// @route   PUT /api/tasks/:id/complete
// @access  Private
router.put('/:id/complete', protect, asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this task');
  }

  task.status = 'completed';

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
}));

// @desc    Mark a task as in-progress
// @route   PUT /api/tasks/:id/in-progress
// @access  Private
router.put('/:id/in-progress', protect, asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this task');
  }

  task.status = 'in-progress';

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
}));

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this task');
  }

  await Task.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: 'Task removed' });
}));

module.exports = router;
