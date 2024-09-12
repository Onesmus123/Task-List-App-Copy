// File Path: src/components/Footer.js

import React from 'react';
import './Footer.css';  // Include styles for the footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Task Management App. All rights reserved.</p>
            <p>Need Help? – Check out our <a href="/faq">FAQ</a> or reach out to <a href="/support">support</a> for assistance.</p>
        </footer>
    );
};

export default Footer;
