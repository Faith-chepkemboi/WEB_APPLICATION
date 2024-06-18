import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Importing CSS file for component styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on form submit
        try {
            const response = await axios.post('http://localhost:8000/core/api/forgot-password/', { email, username });
            setMessage('Password reset link has been sent to your email.');
            setError('');
        } catch (error) {
            console.error('Forgot Password error:', error);
            setError('Error sending password reset link. Please try again with right credntials.');
            setMessage('');
        } finally {
            setLoading(false); // Set loading to false after request completes
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
                        onChange={handleEmailChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Loading...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ForgotPassword;
