// File Path: src/pages/DashboardPage.js

import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './DashboardPage.css'; // Import CSS for styling

const DashboardPage = () => {
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [error, setError] = useState(null); // State to store error messages

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (token) {
                const response = await getTasks(token); // Pass the token to the API call
                setTasks(response); // Set tasks state with the fetched data
            } else {
                setError('No token found, please log in again.'); // Set error if token is missing
            }
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setError('Failed to fetch tasks.'); // Set error if fetch fails
        }
    };

    // Function to handle task creation
    const handleCreateTask = async (taskData) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (token) {
                await createTask(taskData, token); // Pass the token to the API call
                fetchTasks(); // Refresh the task list after task creation
            } else {
                setError('No token found, please log in again.'); // Set error if token is missing
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
            setError('Failed to create task.'); // Set error if task creation fails
        }
    };

    // Function to handle task updates
    const handleUpdateTask = async (taskId, updatedData) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (token) {
                await updateTask(taskId, updatedData, token); // Pass the token to the API call
                fetchTasks(); // Refresh the task list after task update
            } else {
                setError('No token found, please log in again.'); // Set error if token is missing
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
            setError('Failed to update task.'); // Set error if task update fails
        }
    };

    // Function to handle task deletion
    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (token) {
                await deleteTask(taskId, token); // Pass the token to the API call
                fetchTasks(); // Refresh the task list after task deletion
            } else {
                setError('No token found, please log in again.'); // Set error if token is missing
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
            setError('Failed to delete task.'); // Set error if task deletion fails
        }
    };

    return (
        <div className="dashboard">
            {/* Updated header for the dashboard */}
            <header className="dashboard-header">
                <p>Plan Your Day – Add tasks, set priorities, and track deadlines. Stay on top of your work.</p>
            </header>
            {error && <p className="error-message">{error}</p>} {/* Display error if any */}
            <section className="task-form-section">
                <TaskForm onCreateTask={handleCreateTask} /> {/* Render task form */}
            </section>
            <section className="task-list-section">
                <TaskList
                    tasks={tasks} // Pass tasks to TaskList
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                />
            </section>
        </div>
    );
};

export default DashboardPage;
