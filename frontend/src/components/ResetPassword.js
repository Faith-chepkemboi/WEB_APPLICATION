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
            setError('Error resetting password. Please try again with the right credentials.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>
            <div style={{ marginBottom: '10px' }}>
                {error && <div style={{ marginBottom: '10px', color: 'red' }}>{error}</div>}
                {successMessage && <div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>}
            </div>
            <form onSubmit={handleResetPassword}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="repeatNewPassword" style={{ display: 'block', marginBottom: '5px' }}>Repeat New Password:</label>
                    <input
                        type="password"
                        id="repeatNewPassword"
                        name="repeatNewPassword"
                        value={formData.repeatNewPassword}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
