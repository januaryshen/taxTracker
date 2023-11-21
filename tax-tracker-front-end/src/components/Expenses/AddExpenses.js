// src/components/AddExpenses.js
import React, { useState } from "react";
import ExpenseEntry from "./ExpenseEntry";
import "./AddExpenses.css";

function AddExpenses() {
  const today = new Date().toISOString().split("T")[0];
  const [expenseData, setExpenseData] = useState({
    user: 1,
    date: today,
    description: "",
    amount: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/expenses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Transaction added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    setExpenseData({ ...expenseData, description: "", amount: "" });
  };

  return (
    <div className="add-expenses-container">
      <h2>Add Expense</h2>
      <ExpenseEntry
        expenseData={expenseData}
        onChange={(e) =>
          setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddExpenses;