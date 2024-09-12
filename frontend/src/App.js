// File Path: src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    const token = localStorage.getItem('token'); // Check if user is logged in

    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage token={token} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
