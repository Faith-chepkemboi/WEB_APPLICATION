import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import Logout from './components/Logout';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginForm} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile/update" component={UpdateProfile} />
                <Route path="/logout" component={Logout} />
            </Switch>
        </Router>
    );
};

export default App;
