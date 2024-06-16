import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/core/api/token/', formData);
      console.log("respomse".response)
      const accessToken = response.data.access;

      // Decode the access token
      const decodedToken = jwtDecode(accessToken);
      console.log("Decoded Token:", decodedToken);

      // Check if the decoded email matches the form data email
      if (decodedToken.email !== formData.email) {
        setErrors({ email: 'Email is not registered' });
        return;
      }
      if (decodedToken.username !== formData.username) {
        setErrors({ username: 'Invalid username' });
        return;
      }else{
        setErrors(response);
        return;
      }

      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', response.data.refresh);
      setErrors({});
      history.push('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
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
        <button type="submit" className="btn">Login</button>
      </form>
      {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
      <p className="register-link">
        Not registered? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
