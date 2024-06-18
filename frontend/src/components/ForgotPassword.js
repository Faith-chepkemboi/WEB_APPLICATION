import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'username') {
            setUsername(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/core/api/forgot-password/', { email, username });
            setMessage('Password reset link has been sent to your email.');
            setError('');
        } catch (error) {
            console.error('Forgot Password error:', error);
            setError('Error sending password reset link. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn">Send Reset Link</button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ForgotPassword;
