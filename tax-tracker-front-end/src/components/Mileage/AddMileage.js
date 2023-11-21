import React, { useState, useEffect, useContext } from "react";
import MileageEntry from "./MileageEntry";
import { MileageContext } from "../Context/MileageContext";
import "./AddMileage.css";

const AddMileage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [mileageData, setMileageData] = useState({
    user: 1,
    date: today,
    departure_lat: 47.6101497,
    departure_lng: -122.2015159,
    departure_location: "Bellevue, WA, USA",
    arrival_lat: 47.6061389,
    arrival_lng: -122.3328481,
    arrival_location: "Seattle, WA, USA",
  });

  const { locations } = useContext(MileageContext);

  useEffect(() => {
    if (locations.departure && locations.arrival) {
      setMileageData((m) => ({
        ...m,
        departure_lat: locations.departure.lat,
        departure_lng: locations.departure.lng,
        departure_location: locations.departure.address,
        arrival_lat: locations.arrival.lat,
        arrival_lng: locations.arrival.lng,
        arrival_location: locations.arrival.address,
      }));
    }
  }, [locations]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMileageData = {
      ...mileageData,
      departure_lat: locations.departure?.lat,
      departure_lng: locations.departure?.lng,
      departure_location: locations.departure?.address,
      arrival_lat: locations.arrival?.lat,
      arrival_lng: locations.arrival?.lng,
      arrival_location: locations.arrival?.address,
    };

    fetch("http://127.0.0.1:8000/api/mileage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMileageData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset or update the form state as needed after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
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
