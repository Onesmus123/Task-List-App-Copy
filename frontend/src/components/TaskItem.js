// File Path: src/components/TaskItem.js

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import './TaskItem.css';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onCompleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.status === 'completed'); // Track completed status

    useEffect(() => {
        setIsCompleted(task.status === 'completed');
    }, [task]);

    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        deadline: task.deadline.split('T')[0], 
    });

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateTask(task._id, updatedTask);
        setIsEditing(false);
    };

    // Handle task status change
    const handleStatusChange = async () => {
        const newStatus = isCompleted ? 'in-progress' : 'completed';
        try {
            const token = localStorage.getItem('token');
            await onCompleteTask(task._id); // Use the passed down onCompleteTask function
            setIsCompleted(newStatus === 'completed');
        } catch (error) {
            console.error('Error updating task status:', error.message);
        }
    };

    const handleDelete = () => {
        onDeleteTask(task._id);
    };

    return (
        <div className={`task-item ${isCompleted ? 'completed' : 'in-progress'}`}>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        value={updatedTask.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="deadline"
                        value={updatedTask.deadline}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update Task</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <div className="task-item">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                    
                    {/* Display status with color icons */}
                    <p>Status: 
                        {isCompleted ? (
                            <FaCheckCircle color="green" className="status-icon" />  // Green for completed
                        ) : (
                            <FaCircle color="orange" className="status-icon" />  // Orange for in-progress
                        )}
                    </p>

                    {/* Button for marking task as completed or in-progress */}
                    <button
                        onClick={handleStatusChange}
                        className={isCompleted ? 'completed-btn' : 'complete-btn'}
                    >
                        {isCompleted ? 'Task Completed' : 'Mark as Completed'}
                    </button>

                    {/* Buttons for editing and deleting */}
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
