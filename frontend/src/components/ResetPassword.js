import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory();
    const location = useLocation();
    const [formData, setFormData] = useState({
        token: new URLSearchParams(location.search).get('token'),
        email: new URLSearchParams(location.search).get('email'),
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

        const { token, email, newPassword, repeatNewPassword } = formData;

        if (!token || !email) {
            setError('Invalid reset link. Please request a new one.');
            return;
        }

        if (newPassword !== repeatNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/core/api/reset-password/', {
                token,
                email,
                new_password: newPassword,
                repeat_new_password: repeatNewPassword,
            });

            setSuccessMessage(response.data.detail);
            setError('');
        } catch (error) {
            setError('Error resetting password. Please try again.');
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
