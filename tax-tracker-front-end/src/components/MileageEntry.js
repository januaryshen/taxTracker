// src/components/MileageEntry.js
import React from "react";
import "./MileageEntry.css"; // Create and style this CSS file as needed
import MapSelector from "./MapSelector";

const MileageEntry = ({ mileageData, onChange, onSubmit }) => {

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
      <MapSelector />
      <div className="mileage-entry-buttons">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MileageEntry;
