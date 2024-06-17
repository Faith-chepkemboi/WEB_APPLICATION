import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import statement for jwtDecode
import { Snackbar } from '@mui/material'; // Import Snackbar from Material-UI
import '../style.css'; // Ensure correct path for your CSS file

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for controlling Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // Default severity
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message to be displayed
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/core/api/token/', formData);
            const accessToken = response.data.access;

            // Decode the access token
            const decodedToken = jwtDecode(accessToken);

            // Check if the decoded email matches the form data email
            if (decodedToken.email !== formData.email) {
                setErrors({ email: 'Email is not registered' });
                return;
            }

            // Check if the decoded username matches the form data username
            if (decodedToken.username !== formData.username) {
                setErrors({ username: 'Invalid username' });
                return;
            }

            // Save tokens to localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', response.data.refresh);

            // Clear any previous errors
            setErrors({});

            // Redirect to dashboard
            history.push('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                // Log the error response for debugging
                console.error('Login error:', error.response.data);

                if (error.response.status === 400 && error.response.data.detail === 'Incorrect password') {
                    setSnackbarSeverity('error');
                    setSnackbarMessage('Incorrect password. Please try again.');
                } else {
                    // Set generic error message for invalid email or password
                    setSnackbarSeverity('error');
                    setSnackbarMessage('Invalid email or password. Please try again.');
                }
            } else {
                console.error('Login error:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('An error occurred. Please try again.');
            }

            // Open the Snackbar to display the error message
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
            <p className="register-link">
                Not registered? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;
