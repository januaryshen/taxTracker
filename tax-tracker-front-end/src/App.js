// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Expenses from "./components/Expenses/Expenses";
import Mileage from "./components/Mileage/Mileage";
import { DateRangeProvider } from "./components/Context/DateRangeContext";
import { MileageProvider } from "./components/Context/MileageContext";
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Router>
        <NavBar />
        <DateRangeProvider>
          <MileageProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/mileage" element={<Mileage />} />
            </Routes>
          </MileageProvider>
        </DateRangeProvider>
      </Router>
    </LoadScript>
  );
};

export default App;
