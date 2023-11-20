// src/components/AddExpenses.js
import React, { useState } from "react";
import ExpenseEntry from "./ExpenseEntry";
import "./AddExpenses.css";

function AddExpenses() {
  const [expenseData, setExpenseData] = useState({
    user: 1,
    date: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST request to expenses/ endpoint
    fetch("http://127.0.0.1:8000/api/expenses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Clear the form or give feedback to the user
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here, such as displaying a message to the user
      });
  };

  const handleCancel = () => {
    // Clear the form or handle the cancel action
    setExpenseData({ date: "", description: "", amount: "" });
  };

  return (
    <div className="add-expenses-container">
      <h2>Add Expense</h2>
      <ExpenseEntry
        expenseData={expenseData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddExpenses;
