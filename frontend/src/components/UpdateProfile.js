import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing back arrow icon from react-icons

const FormContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: 'auto',
});

const FormTitle = styled('h2')({
  marginBottom: '20px',
  textAlign: 'center',
  color: '#3cc5ca', // Light blue color
});

const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  width: '100%',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#3cc5ca', // Light blue color
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1ea6ab', // Darker shade of blue on hover
  },
});

const BackButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'green', // Light blue color
  color: '#fff',
  marginBottom: '20px',
  '&:hover': {
    backgroundColor: '#1ea6ab', // Darker shade of blue on hover
  },
});

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const history = useHistory(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:8000/core/api/updateProfile/', formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully!');
      history.push('/dashboard');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleBackClick = () => {
    history.push('/dashboard');
  };

  return (
    <FormContainer>
      <BackButton onClick={handleBackClick}>
        <FaArrowLeft style={{ marginRight: '5px' }} /> Back to Dashboard
      </BackButton>
      <FormTitle>Update Profile</FormTitle>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <SubmitButton type="submit" variant="contained">
          Update Profile
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default UpdateProfile;
