// File Path: src/api.js

import axios from 'axios';

const API_URL = 'https://task-list-app-copy-backend.onrender.com';

// Function to handle user registration
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            return await response.json(); // Returns the response from the backend
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return { error: error.message }; // Return error message
    }
};

// Function to handle user login
export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json(); // Returns the response from the backend
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};

// Task API
export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error creating task');
    }
};

// Fetch tasks with optional filtering, sorting, and search
export const getTasks = async (token, status = '', searchQuery = '', sortCriteria = '') => {
    try {
        const params = {};

        if (status) params.status = status;
        if (searchQuery) params.search = searchQuery;
        if (sortCriteria) params.sort = sortCriteria;

        const response = await axios.get(`${API_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params, // Attach query parameters for filtering, sorting, and search
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error fetching tasks');
    }
};

export const updateTask = async (taskId, updatedData, token) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error updating task');
    }
};

export const deleteTask = async (taskId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error deleting task');
    }
};

// Mark a task as completed
export const markTaskAsCompleted = async (taskId, token) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}/complete`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error marking task as completed:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error marking task as completed');
    }
};

// Mark a task as in-progress
export const markTaskAsInProgress = async (taskId, token) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}/in-progress`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error marking task as in-progress:', error.response ? error.response.data.message : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error marking task as in-progress');
    }
};
