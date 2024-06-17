import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import Logout from './components/Logout';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/changePassword" component={ChangePasswordForm} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/reset_password" component={ResetPassword} />
                <Route path="/updateProfile" component={UpdateProfile} />
                <Route path="/logout" component={Logout} />
                
            </Switch>
        </Router>
    );
};

export default App;
