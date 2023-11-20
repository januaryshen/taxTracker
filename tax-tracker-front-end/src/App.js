// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import OtherExpenses from './components/OtherExpenses.js';
import Mileage from './components/Mileage';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" exact component={Home} />
                <Route path="/expenses" component={OtherExpenses} />
                <Route path="/mileage" component={Mileage} />
            </Routes>
        </Router>
    );
}

export default App;
