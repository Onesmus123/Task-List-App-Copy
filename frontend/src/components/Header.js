// File Path: src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';  // Include styles for the header

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>Task Management App</h1>
            </div>
            <nav className="nav-links">
                {token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
