import React from "react";
import "./ExpensesTable.css";

const ExpensesTable = ({
  expenses,
  sortExpenses,
  getSortIndicator,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <table className="list-expenses-table">
      <thead>
        <tr>
          <th className="date-column" onClick={() => sortExpenses("date")}>
            Date{getSortIndicator("date")}
          </th>
          <th
            className="description-column"
            onClick={() => sortExpenses("description")}
          >
            Description{getSortIndicator("description")}
          </th>
          <th onClick={() => sortExpenses("amount")}>
            Amount{getSortIndicator("amount")}
          </th>
          <th className="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className="date-column">{expense.date}</td>
            <td className="description-column">{expense.description}</td>
            <td>${expense.amount}</td>
            <td className="actions-column">
              <button onClick={() => handleEditClick(expense)}>Edit</button>
              <button onClick={(e) => handleDelete(e, expense.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
