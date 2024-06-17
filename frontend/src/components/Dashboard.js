import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/profile">View Profile</Link>
                    </li>
                    <li>
                        <Link to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
