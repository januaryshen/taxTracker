import React from "react";
import "./MileageEntry.css";
import MapSelector from "../Context/MapSelector";

const MileageEntry = ({ mileageData, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="mileage-entry-form">
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={mileageData.date}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <strong>Departure Location: </strong>
        <span>{mileageData.departure_location || "Not set"}</span>
      </div>

      <div className="form-group">
        <strong>Arrival Location: </strong>
        <span>{mileageData.arrival_location || "Not set"}</span>
      </div>

      <div className="mileage-entry-buttons">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <MapSelector selectedMileage={mileageData} />
    </form>
  );
};

export default MileageEntry;
