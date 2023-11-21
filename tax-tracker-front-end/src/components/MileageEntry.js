// src/components/MileageEntry.js
import React from "react";
import "./MileageEntry.css";
import MapSelector from "./MapSelector";

const MileageEntry = ({ mileageData, onChange, onSubmit, onCancel }) => {
  console.log("mileage data", mileageData);
  return (
    <form onSubmit={onSubmit} className="mileage-entry-form">
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={mileageData.date}
          onChange={onChange}
        />
      </label>

      <MapSelector
        initialDeparture={{
          lat: mileageData.departure_lat,
          lng: mileageData.departure_lng,
          address: mileageData.address,
        }}
        initialArrival={{
          lat: mileageData.arrival_lat,
          lng: mileageData.arrival_lng,
          address: mileageData.address,
        }}
      />
      <div className="mileage-entry-buttons">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MileageEntry;
