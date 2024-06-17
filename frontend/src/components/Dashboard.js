import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from MUI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const DashboardContainer = styled('div')({
    // backgroundImage: `url(${backgroundImage})`,
    // backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'green', // Set the background color to green
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '240px',
        backgroundColor: '#e6e6fa', // Light purple background color
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)', // Shadow for the drawer
        transition: 'box-shadow 0.3s', // Optional: Add transition for smoother effect
        '&:hover': {
            boxShadow: '2px 0px 5px #3cc5ca', // Shadow on hover with light blue color
        },
    },
}));

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const history = useHistory();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDeleteProfile = async () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this Account profile?');
      if (!confirmDelete) {
          return; // If user cancels, do nothing
      }

      try {
          await axios.delete('http://localhost:8000/core/api/deleteProfile/', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
          });
          // Clear tokens from localStorage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // Redirect to login page or another appropriate page
          history.push('/login');
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
                    <ListItem button component="a" href="/profile" onClick={toggleDrawer}>
                        <ListItemText primary="View Profile" />
                    </ListItem>
                    <ListItem button component="a" href="/updateProfile" onClick={toggleDrawer}>
                        <ListItemText primary="Update Profile" />
                    </ListItem>
                    <ListItem button onClick={handleDeleteProfile}>
                        <ListItemText primary="Delete Profile" />
                    </ListItem>
                    <ListItem button component="a" href="/changePassword" onClick={toggleDrawer}>
                        <ListItemText primary="Change Password" />
                    </ListItem>
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
