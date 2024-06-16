
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/register" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} /> 
                
            </Switch>
        </Router>
    );
};

export default App;
