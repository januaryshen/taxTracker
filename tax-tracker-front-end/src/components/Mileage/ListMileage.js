import React, { useEffect, useState, useContext } from "react";
import { DateRangeContext } from "../Context/DateRangeContext";
import DateRangeSelector from "../Context/DateRangeSelector";
import "./ListMileage.css";
import MileageTable from "./MileageTable";
import MileageEntry from "./MileageEntry";
import { MileageContext } from "../Context/MileageContext";

const ListMileage = () => {
  const { locations } = useContext(MileageContext);

  const [mileage, setMileage] = useState([]);
  const [selectedMileage, setSelectedMileage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { startDate, endDate } = useContext(DateRangeContext);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchMileage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const fetchMileage = () => {
    const queryString = new URLSearchParams({
      startDate,
      endDate,
    }).toString();
    fetch(`http://127.0.0.1:8000/api/mileage/?${queryString}`)
      .then((response) => response.json())
      .then((data) => setMileage(data))
      .catch((error) => console.error("Error:", error));
  };

  const sortByKey = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedMileage = () => {
    if (!sortConfig.key) {
      return mileage;
    }
    return [...mileage].sort((a, b) => {
      // Special handling for 'mileage' to sort numerically
      if (sortConfig.key === "mileage") {
        const mileageA = parseFloat(a.mileage);
        const mileageB = parseFloat(b.mileage);
        return sortConfig.direction === "ascending"
          ? mileageA - mileageB
          : mileageB - mileageA;
      }
      // Default sorting for other columns
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  const sortedMileage = getSortedMileage();

  const handleDelete = (event, mileageId) => {
    event.stopPropagation();
    fetch(`http://127.0.0.1:8000/api/mileage/${mileageId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        fetchMileage(); // Refresh the expenses list
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEditClick = (mileageEntry) => {
    // Store the selected mileage entry in the context
    setSelectedMileage(mileageEntry);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedMileageData = {
      ...selectedMileage,
      departure_location: locations.departure.address,
      arrival_location: locations.arrival.address,
      departure_lat: locations.departure.lat,
      departure_lng: locations.departure.lng,
      arrival_lat: locations.arrival.lat,
      arrival_lng: locations.arrival.lng,
    };

    fetch(`http://127.0.0.1:8000/api/mileage/${selectedMileage.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMileageData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchMileage(); // Refresh the list
        setIsEditing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (e) => {
    setSelectedMileage((prevMileage) => ({
      ...prevMileage,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <DateRangeSelector />
      <div className="list-expenses-container">
        {!isEditing ? (
          <MileageTable
            mileageData={sortedMileage}
            sortByKey={sortByKey}
            getSortIndicator={getSortIndicator}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        ) : (
          <MileageEntry
            mileageData={selectedMileage}
            onChange={handleChange}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            showCancel={true}
          />
        )}
      </div>
    </>
  );
};

export default ListMileage;
