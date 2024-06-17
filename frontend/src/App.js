
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
// import Profile from './components/Profile';
// import UpdateProfile from './components/UpdateProfile';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/register" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route path="/dashboard" component={Dashboard} />
                {/* <Route path="/profile" exact component={Profile} />
                <Route path="/profile/update" component={UpdateProfile} /> */}
 
                
            </Switch>
        </Router>
    );
};

export default App;
