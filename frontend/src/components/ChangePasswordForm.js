import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar } from '@mui/material';

const ChangePasswordForm = ({ onSuccess }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.repeatNewPassword) {
            setSnackbarSeverity('error');
            setSnackbarMessage('New passwords do not match. Please try again.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/core/api/changePassword/', passwordData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            console.log('Password changed successfully:', response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage('Password changed successfully!');
            setSnackbarOpen(true);
            onSuccess(); // Call the onSuccess callback provided by parent component
        } catch (error) {
            console.error('Error changing password:', error.response.data.detail);
            if (error.response.status === 400 && error.response.data.detail === 'Current password is incorrect.') {
                setSnackbarSeverity('error');
                setSnackbarMessage('Current password is incorrect. Please try again.');
            } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to change password. Please try again.');
            }
            setSnackbarOpen(true);
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </form>
    );
};

export default ChangePasswordForm;
