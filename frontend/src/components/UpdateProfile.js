import React, { useState } from 'react';

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        birth_date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your update profile logic here (e.g., API call)
        console.log('Form submitted with data:', formData);
        alert('Profile updated successfully!');
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Bio:
                    <textarea name="bio" value={formData.bio} onChange={handleChange} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </label>
                <label>
                    Birth Date:
                    <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
