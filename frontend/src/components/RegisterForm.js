import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Import the CSS file
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/core/api/register/', formData);
      setSuccessMessage('Registration successful!');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: 'An error occurred' });
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <div className="error-message">{errors.username[0]}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email[0]}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password[0]}</div>}
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
      {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
      <p className="login-link">
                Already registered? <Link to="/">Login here</Link>
            </p>
    </div>
  );
};

export default Register;
