// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Expenses from "./components/Expenses";
import Mileage from "./components/Mileage";
import { DateRangeProvider } from "./components/DateRangeContext";

const App = () => {
  return (
    <Router>
      <NavBar />
      <DateRangeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/mileage" element={<Mileage />} />
        </Routes>
      </DateRangeProvider>
    </Router>
  );
};

export default App;
