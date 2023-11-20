// src/components/ExpenseForm.js
import React, { useState } from 'react';

function ExpenseForm({ onSubmit }) {
    const [expense, setExpense] = useState({
        date: '',
        description: '',
        amount: ''
    });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(expense);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date:
                <input type="date" name="date" value={expense.date} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={expense.description} onChange={handleChange} />
            </label>
            <label>
                Amount:
                <input type="number" name="amount" value={expense.amount} onChange={handleChange} />
            </label>
            <button type="submit">Submit Expense</button>
        </form>
    );
}

export default ExpenseForm;
