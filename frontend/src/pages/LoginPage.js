// File Path: src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../api'; 
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({ email, password });
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            navigate('/dashboard'); // Redirect to the dashboard after login
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
