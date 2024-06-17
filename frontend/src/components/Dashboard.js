import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, AccountCircle } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../style.css';  // Make sure to create this CSS file

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                    <Menu />
                </IconButton>
                <h2>Dashboard</h2>
                <Link to="/logout" className="logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
            </header>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary="View Profile" />
                    </ListItem>
                </List>
            </Drawer>
            <main className="dashboard-content">
                <h2>Welcome to the Dashboard</h2>
                {/* Add routing or content here */}
            </main>
        </div>
    );
};

export default Dashboard;
