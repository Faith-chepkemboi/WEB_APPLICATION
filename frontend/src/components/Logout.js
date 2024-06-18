import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    console.log("Logout component rendered");

    const history = useHistory();

    useEffect(() => {
        console.log("useEffect called in Logout");

        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log("Tokens removed");

        // Redirect to login page
        history.push('/');
        console.log("Redirecting to login");
    }, [history]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
