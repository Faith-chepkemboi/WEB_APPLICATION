import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";




const Login = () => {
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
      console.log("response ",response)
      const accessToken = response.data.access;
      console.log(" accessToken",accessToken)
      const decodedToken = jwtDecode(accessToken);
      console.log("decoded token",decodedToken)
      

      if (decodedToken.email !== formData.email) {
        setErrors({ email: 'incorrect email' });
        return;
      }

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      {errors.non_field_errors && <div style={{ color: 'red' }}>{errors.non_field_errors}</div>}
      <p>
        Not registered? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
