// src/components/Dashboard.js

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faEdit, faTrashAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';

const DashboardContainer = styled('div')({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'green',
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '240px',
        backgroundColor: '#e6e6fa',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s',
        '&:hover': {
            boxShadow: '2px 0px 5px #3cc5ca',
        },
    },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
    color: '#333',
    marginBottom: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.3s, transform 0.3s',
    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
        backgroundColor: '#d1c4e9',
        transform: 'scale(1.02)',
    },
}));

const ListItemTextStyled = styled(ListItemText)({
    '& .MuiTypography-root': {
        fontWeight: 'bold',
        color: '#fff',
    },
});

const ListItemIconStyled = styled(ListItemIcon)({
    color: '#fff',
});

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const history = useHistory();
    // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            alert('Please log in to access the dashboard.');
            history.push('/');
        }
    }, [ history]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDeleteProfile = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Account profile?');
        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete('http://localhost:8000/core/api/deleteProfile/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            // setIsAuthenticated(false);
            history.push('/');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Failed to delete profile. Please try again.');
        }
    };

    return (
        <DashboardContainer>
            <AppBarStyled position="static">
                <Toolbar>
                    <Menu onClick={toggleDrawer} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Link to="/logout" className="logout-button">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                </Toolbar>
            </AppBarStyled>

            <DrawerStyled anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItemStyled button component="a" href="/profile" onClick={toggleDrawer}>
                        <ListItemIconStyled>
                            <FontAwesomeIcon icon={faUser} />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary="View Profile" />
                    </ListItemStyled>
                    <ListItemStyled button component="a" href="/updateProfile" onClick={toggleDrawer}>
                        <ListItemIconStyled>
                            <FontAwesomeIcon icon={faEdit} />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary="Update Profile" />
                    </ListItemStyled>
                    <ListItemStyled button onClick={handleDeleteProfile}>
                        <ListItemIconStyled>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary="Delete Profile" />
                    </ListItemStyled>
                    <ListItemStyled button component="a" href="/changePassword" onClick={toggleDrawer}>
                        <ListItemIconStyled>
                            <FontAwesomeIcon icon={faKey} />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary="Change Password" />
                    </ListItemStyled>
                </List>
            </DrawerStyled>

            <main className="dashboard-content">
                <h2>Welcome to the Dashboard</h2>
                {/* Add routing or content here */}
            </main>
        </DashboardContainer>
    );
};

export default Dashboard;
