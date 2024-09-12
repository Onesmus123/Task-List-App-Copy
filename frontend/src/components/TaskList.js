// File Path: src/components/TaskList.js

import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { markTaskAsCompleted } from '../api'; // Import the API function
import FilterSort from './FilterSort';
import './TaskList.css'; // Import the CSS file

const TaskList = ({ tasks = [], onUpdateTask, onDeleteTask }) => {
    // State to manage filtered tasks
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    // Handle task completion
    const handleCompleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token'); // Ensure token is provided
            await markTaskAsCompleted(taskId, token); // Call the API function to mark the task as completed
            // Optionally, refresh the task list or update the UI after completion
            setFilteredTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: 'completed' } : task
                )
            );
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    // Handle filtering tasks by status and search query
    const handleFilter = (status, searchQuery) => {
        let updatedTasks = tasks;

        // Filter by status
        if (status) {
            updatedTasks = updatedTasks.filter((task) => task.status === status);
        }

        // Search by title or description
        if (searchQuery) {
            updatedTasks = updatedTasks.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTasks(updatedTasks);
    };

    // Handle sorting tasks by criteria
    const handleSort = (criteria) => {
        let sortedTasks = [...filteredTasks];

        if (criteria === 'deadline') {
            sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (criteria === 'priority') {
            sortedTasks.sort((a, b) => a.priority - b.priority);
        }

        setFilteredTasks(sortedTasks);
    };

    // Update filtered tasks when the original tasks change
    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <div>
            <FilterSort onFilterChange={handleFilter} onSortChange={handleSort} onSearch={handleFilter} />
            <div className="task-list">
                <h3>Your Tasks</h3>
                {filteredTasks.length === 0 ? (
                    <p>No tasks available. Add a new task to get started!</p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            onCompleteTask={handleCompleteTask} // Pass the complete task handler
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
