import React, { useState, useEffect, useContext } from "react";
import MileageEntry from "./MileageEntry";
import "./AddMileage.css";

const AddMileage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [mileageData, setMileageData] = useState({
    user: 1,
    date: today,
    departure_lat: 47.61467378534238,
    departure_lng: -122.19859958661584,
    departure_location: "500 106th Ave NE, Bellevue, WA 98004",
    arrival_lat: 46.585859563555424,
    arrival_lng: -120.5629622019892,
    arrival_location: "1020 S 40th Ave G, Yakima, WA 98908",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/mileage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mileageData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Mileage added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add mileage. Please try again.");
      });
  };

  const handleCancel = () => {
    setMileageData({
      ...mileageData,
      departure_location: "",
      arrival_location: "",
    });
  };

  return (
    <div className="add-mileage-container">
      <h2>Add Mileage</h2>
      <MileageEntry
        mileageData={mileageData}
        onChange={(e) =>
          setMileageData({ ...mileageData, [e.target.name]: e.target.value })
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        showCancel={false}
      />
    </div>
  );
};

export default AddMileage;
