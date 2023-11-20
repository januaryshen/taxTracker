import React, { useEffect, useState, useContext } from "react";
import ExpenseEntry from "./ExpenseEntry";
import { DateRangeContext } from "./DateRangeContext";
import DateRangeSelector from "./DateRangeSelector";
import "./ListExpenses.css";

const ListExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { startDate, endDate } = useContext(DateRangeContext);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  console.log("startDate", startDate);
  console.log("data", expenses);

  useEffect(() => {
    fetchExpenses();
  }, [startDate, endDate]);

  const fetchExpenses = () => {
    console.log("featching");
    console.log("start_date", startDate);
    const queryString = new URLSearchParams({
      startDate,
      endDate,
    }).toString();
    console.log("queryString", queryString);
    fetch(`http://127.0.0.1:8000/api/expenses/?${queryString}`)
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error:", error));
  };

  const sortExpenses = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedExpenses = () => {
    if (!sortConfig.key) {
      return expenses;
    }
    return [...expenses].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedExpenses = getSortedExpenses();

  const handleDelete = (event, expenseId) => {
    event.stopPropagation();
    fetch(`http://127.0.0.1:8000/api/expenses/${expenseId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        fetchExpenses(); // Refresh the expenses list
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/expenses/${selectedExpense.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedExpense),
    })
      .then((response) => response.json())
      .then(() => {
        fetchExpenses(); // Refresh the expenses list
        setIsEditing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (e) => {
    setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <DateRangeSelector />
      <div className="list-expenses-container">
        {!isEditing ? (
          <table className="list-expenses-table">
            <thead>
              <tr>
                <th
                  className="date-column"
                  onClick={() => sortExpenses("date")}
                >
                  Date
                </th>
                <th onClick={() => sortExpenses("description")}>Description</th>
                <th onClick={() => sortExpenses("amount")}>Amount</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="date-column">{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td className="actions-column">
                    <button onClick={() => handleEditClick(expense)}>
                      Edit
                    </button>
                    <button onClick={(e) => handleDelete(e, expense.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ExpenseEntry
            expenseData={selectedExpense}
            onChange={handleChange}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
};

export default ListExpenses;
