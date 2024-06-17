import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/core/api/forgot-password/', { email });
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
                <button type="submit" className="btn">Send Reset Link</button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ForgotPassword;
