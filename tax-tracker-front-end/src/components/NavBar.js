// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <Link to="/">Download CSV</Link>
        <Link to="/mileage">Mileage</Link>
        <Link to="/expenses">Expenses</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
