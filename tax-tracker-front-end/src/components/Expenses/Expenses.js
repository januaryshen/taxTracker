// src/components/Expenses.js
import React, { useState } from "react";
import ListExpenses from "./ListExpenses";
import AddExpenses from "./AddExpenses";
import "./Expenses.css"; // Import the CSS file

const Expenses = () => {
  const [isAdd, setIsAdd] = useState(true);

  return (
    <>
      <div className="expenses-container">
        <button
          className={`button ${isAdd ? "active" : ""}`}
          onClick={() => setIsAdd(true)}
        >
          Add Expense
        </button>
        <button
          className={`button ${!isAdd ? "active" : ""}`}
          onClick={() => setIsAdd(false)}
        >
          List Expenses
        </button>
      </div>
      {isAdd ? <AddExpenses /> : <ListExpenses />}
    </>
  );
};

export default Expenses;
