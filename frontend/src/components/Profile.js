import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing back arrow icon from react-icons
import '../style.css'; // Import CSS file for styling

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

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

    const handleBackClick = () => {
        history.push('/dashboard'); // Navigate back to the dashboard
    };

    return (
        <div className="profile-container">
            <button onClick={handleBackClick} className="back-button">
                <FaArrowLeft /> Back to Dashboard
            </button>
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
