import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import corrected import statement
import '../style.css'; // Import your CSS file with correct path
import { Snackbar } from '@mui/material'; // Import Snackbar from Material-UI

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
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

            // Save tokens to localStorage if "Remember Me" is checked
            if (rememberMe) {
                localStorage.setItem('accessToken', accessToken);
                // Optionally store a refresh token as well
            } else {
                sessionStorage.setItem('accessToken', accessToken);
                // Optionally store a refresh token in sessionStorage
            }

            // Clear any previous errors
            setErrors({});

            // Redirect to dashboard
            history.push('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                // Log the error response for debugging
                console.error('Login error:', error.response.data);
                if (error.response.status === 400 && error.response.data.detail === 'Incorrect password') {
                    setErrors({ non_field_errors: 'Incorrect password. Please try again.' });
                } else {
                    setErrors(error.response.data);
                }
            } else {
                console.error('Login error:', error);
                setErrors({ non_field_errors: 'An error occurred' });
            }
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
                <div className="form-group checkbox-group">
                <label htmlFor="rememberMe">Remember Me</label>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                    />
                   
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
            <p className="forgot-password-link">
                <Link to="/forgotPassword">Forgot Password?</Link>
            </p>
            <p className="register-link">
                Not registered? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;
