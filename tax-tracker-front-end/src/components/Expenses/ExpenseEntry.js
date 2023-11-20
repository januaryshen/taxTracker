// src/components/ExpenseEntry.js
import React from "react";
import "./ExpenseEntry.css";

const ExpenseEntry = ({ expenseData, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="expense-entry-form">
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={expenseData.date}
          onChange={onChange}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={expenseData.description}
          onChange={onChange}
        />
      </label>

      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={expenseData.amount}
          onChange={onChange}
        />
      </label>
      <div className="expense-entry-buttons">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseEntry;
