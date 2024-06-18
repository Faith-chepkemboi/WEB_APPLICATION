// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Import CSS file for styling

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/core/api/profile/', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    },
                });
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {userProfile ? (
                <div className="profile-details">
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Username:</strong> {userProfile.username}</p>
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
};

export default Profile;
