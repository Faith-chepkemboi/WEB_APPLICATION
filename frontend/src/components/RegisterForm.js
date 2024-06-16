import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from 'axios';
import '../style.css';  // Import your CSS file for styling

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/core/api/register/', formData);
            console.log(response.data);  // Handle success response
        } catch (error) {
            console.error(error);  // Handle error
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            <p className="login-link">
                Already registered? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
