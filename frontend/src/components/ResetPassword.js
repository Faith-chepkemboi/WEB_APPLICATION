// ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory();
    const location = useLocation();
    const [formData, setFormData] = useState({
        newPassword: '',
        repeatNewPassword: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        const token = new URLSearchParams(location.search).get('token');
        const email = new URLSearchParams(location.search).get('email');

        if (!token || !email) {
            setError('Invalid reset link. Please request a new one.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/core/api/reset-password/', {
                token,
                email,
                new_password: formData.newPassword,
                repeat_new_password: formData.repeatNewPassword,
            });
            console.log("response",response)
           // setSuccessMessage(response.data.detail);
            setError('');
        } catch (error) {
           // setError(error.response.data.detail);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="repeatNewPassword">Repeat New Password:</label>
                    <input
                        type="password"
                        id="repeatNewPassword"
                        name="repeatNewPassword"
                        value={formData.repeatNewPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
