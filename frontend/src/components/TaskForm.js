// File Path: src/components/TaskForm.js

import React, { useState } from 'react';
import { createTask } from '../api'; // Import the createTask function
import './TaskForm.css'; // Import CSS for styling

const TaskForm = ({ onTaskCreated = () => {} }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null); // State to manage error messages

    // Function to handle task form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const taskData = { title, description, deadline };

        try {
            const response = await createTask(taskData, token); // Pass the token to the API call

            if (response) {
                setTitle('');
                setDescription('');
                setDeadline('');
                setError(null); // Clear any previous errors
                onTaskCreated(); // Notify parent component to refresh the task list
            } else {
                throw new Error('Response data is missing'); // Handle unexpected response
            }
        } catch (error) {
            console.error('Error creating task:', error.message || 'Unknown error');
            setError(error.message || 'An unknown error occurred.'); // Set error message for UI
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>Create New Task</h3>
            
            {/* Group Title and Description on one line for larger screens */}
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* Group Deadline and Submit Button on one line for larger screens */}
            <div className="form-row">
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </div>

            {error && <p className="error">{error}</p>} {/* Display error message if any */}
        </form>
    );
};

export default TaskForm;
