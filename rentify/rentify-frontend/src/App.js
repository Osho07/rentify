// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Properties from './pages/Properties';
import MyProperties from './pages/MyProperties';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/properties" element={<PrivateRoute component={Properties} />} />
          <Route exact path="/my-properties" element={<PrivateRoute component={MyProperties} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;