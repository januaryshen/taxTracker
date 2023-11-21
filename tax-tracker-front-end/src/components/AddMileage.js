import React, { useState, useEffect, useContext } from "react";
import MileageEntry from "./MileageEntry";
import { MileageContext } from "./MileageContext";

const AddMileage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [mileageData, setMileageData] = useState({
    user: 1,
    date: today,
    departure_lat: "",
    departure_lng: "",
    departure_location: "",
    arrival_lat: "",
    arrival_lng: "",
    arrival_location: "",
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
    fetch("http://127.0.0.1:8000/api/mileage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mileageData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
      />
    </div>
  );
};

export default AddMileage;
