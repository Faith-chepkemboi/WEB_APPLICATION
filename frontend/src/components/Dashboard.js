import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../style.css';  // Make sure to create this CSS file

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Dashboard</h2>
                <Link to="/logout" className="logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
            </header>
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
