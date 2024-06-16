import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; // Adjust path as per your actual file structure

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/register" component={RegisterForm} />
                {/* Add more routes for login, profile, etc. */}
            </Switch>
        </Router>
    );
};

export default App;
