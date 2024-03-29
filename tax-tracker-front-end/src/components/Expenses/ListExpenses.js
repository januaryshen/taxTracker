import React, { useEffect, useState, useContext } from "react";
import { DateRangeContext } from "../Context/DateRangeContext";
import DateRangeSelector from "../Context/DateRangeSelector";
import ExpenseEntry from "./ExpenseEntry";
import ExpensesTable from "./ExpensesTable";
import "./ListExpenses.css";

const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const ListExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { startDate, endDate } = useContext(DateRangeContext);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const fetchExpenses = () => {
    const queryString = new URLSearchParams({
      startDate,
      endDate,
    }).toString();
    fetch(`${apiUrl}/expenses/?${queryString}`)
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
      // Special handling for 'amount' to sort numerically
      if (sortConfig.key === "amount") {
        const amountA = parseFloat(a.amount.replace(/[$,]/g, ""));
        const amountB = parseFloat(b.amount.replace(/[$,]/g, ""));
        return sortConfig.direction === "ascending"
          ? amountA - amountB
          : amountB - amountA;
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

  const sortedExpenses = getSortedExpenses();

  const handleDelete = (event, expenseId) => {
    event.stopPropagation();
    fetch(`${apiUrl}/expenses/${expenseId}/`, {
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
    fetch(`${apiUrl}/expenses/${selectedExpense.id}/`, {
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
      <div>
        {!isEditing ? (
          <ExpensesTable
            expenses={sortedExpenses}
            sortExpenses={sortExpenses}
            getSortIndicator={getSortIndicator}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        ) : (
          <>
            <h2>Edit Expense</h2>
            <ExpenseEntry
              expenseData={selectedExpense}
              onChange={handleChange}
              onSubmit={handleUpdate}
              onCancel={handleCancel}
              showCancel={true}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ListExpenses;
