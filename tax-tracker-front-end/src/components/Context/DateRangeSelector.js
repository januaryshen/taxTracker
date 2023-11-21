import React, { useContext, useState, useEffect } from "react";
import { DateRangeContext } from "./DateRangeContext"; // Adjust the path as needed
import "./DateRangeSelector.css";

const DateRangeSelector = () => {
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(DateRangeContext);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStartDate(localStartDate);
    setEndDate(localEndDate);
  };

  return (
    <div className="date-range-selector">
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={localStartDate || ""} // Using the local state
          onChange={(e) => setLocalStartDate(e.target.value)}
        />
        <input
          type="date"
          value={localEndDate || ""} // Using the local state
          onChange={(e) => setLocalEndDate(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default DateRangeSelector;
