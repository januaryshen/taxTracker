import React from "react";
import "./MileageEntry.css";
import MapSelector from "../Context/MapSelector";

const MileageEntry = ({
  mileageData,
  onChange,
  onSubmit,
  onCancel,
  showCancel,
}) => {
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
        <p>Departure Location: </p>
        <span>{mileageData.departure_location || "Not set"}</span>
      </div>
      <div className="form-group">
        <p>Arrival Location: </p>
        <span>{mileageData.arrival_location || "Not set"}</span>
      </div>
      <div>
        {showCancel && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit">
          Submit
        </button>
      </div>
      <MapSelector selectedMileage={mileageData} />
    </form>
  );
};

export default MileageEntry;
