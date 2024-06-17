import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const ChangePasswordForm = ({ onSuccess }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    });

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.repeatNewPassword) {
            alert('New passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/core/api/changePassword/', passwordData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log('Password changed successfully:', response.data);
            alert('Password changed successfully!');
            onSuccess(); // Call the onSuccess callback provided by parent component
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="password"
                label="Old Password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                type="password"
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                type="password"
                label="Repeat New Password"
                name="repeatNewPassword"
                value={passwordData.repeatNewPassword}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Change Password
            </Button>
        </form>
    );
};

export default ChangePasswordForm;
