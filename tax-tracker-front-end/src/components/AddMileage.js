import React, { useState, useEffect, useContext } from 'react';
import MileageEntry from './MileageEntry';
import { MileageContext } from './MileageContext';

const AddMileage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [mileageData, setMileageData] = useState({
    user: 1,
    date: today,
    arrival_location: "",
    departure_location: "",
    mileage: "",
  });

  const { departureLocation, arrivalLocation } = useContext(MileageContext);

  // Update mileageData when the departure or arrival locations change
  useEffect(() => {
    if (departureLocation) {
      setMileageData(m => ({ ...m, departure_location: JSON.stringify(departureLocation) }));
    }
    if (arrivalLocation) {
      setMileageData(m => ({ ...m, arrival_location: JSON.stringify(arrivalLocation) }));
    }
  }, [departureLocation, arrivalLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make sure to update this fetch call with the correct endpoint and setup
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
