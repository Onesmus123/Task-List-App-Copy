// File Path: src/pages/HomePage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ token }) => {
    const navigate = useNavigate();

    // If logged in, redirect to dashboard
    if (token) {
        navigate('/dashboard');
    }

    return (
        <div className="home">
            <h2>Welcome to Task Manager - Your personal task tracker to stay organized and productive.</h2>
            <Link to="/login">
                <button className="get-started-btn">Get Started</button>
            </Link>
        </div>
    );
};

export default HomePage;
