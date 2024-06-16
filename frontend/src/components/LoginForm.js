import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../style.css';  

const LoginForm = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <p className="register-link">
                Not registered? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;
