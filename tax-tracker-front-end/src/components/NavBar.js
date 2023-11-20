// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav">
      <ul>
        <Link to="/">Home</Link>
        <Link to="/mileage">Mileage</Link>
        <Link to="/expenses">Other Expenses</Link>
      </ul>
    </nav>
  );
}

export default NavBar;
