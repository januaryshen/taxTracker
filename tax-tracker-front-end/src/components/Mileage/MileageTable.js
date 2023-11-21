import React from "react";
import "../Expenses/ExpensesTable.css";

const MileageTable = ({
  mileageData,
  sortByKey,
  getSortIndicator,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <table className="list-expenses-table">
      <thead>
        <tr>
          <th className="date-column" onClick={() => sortByKey("date")}>
            Date{getSortIndicator("date")}
          </th>
          <th onClick={() => sortByKey("departure_location")}>
            Departure{getSortIndicator("departure_location")}
          </th>
          <th onClick={() => sortByKey("arrival_location")}>
            Arrival{getSortIndicator("arrival_location")}
          </th>
          <th onClick={() => sortByKey("mileage")}>
            Mileage (mile){getSortIndicator("mileage")}
          </th>
          <th className="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mileageData.map((m) => {
          return (
            <tr key={m.id}>
              <td className="date-column">{m.date}</td>
              <td>{m.departure_location}</td>
              <td>{m.arrival_location}</td>
              <td>{m.mileage}</td>
              <td className="actions-column">
                <button onClick={() => handleEditClick(m)}>Edit</button>
                <button onClick={(e) => handleDelete(e, m.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MileageTable;
