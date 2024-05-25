
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register.js';
import Login from './pages/Login';
import Properties from './pages/Properties';
import MyProperties from './pages/MyProperties';
import PrivateRoute from './components/PrivateRoute.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/Legister" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/properties" component={Properties} />
                    <PrivateRoute exact path="/my-properties" component={MyProperties} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
