// src/components/ExpenseEntry.js
import React from 'react';
import "./ExpenseEntry.css"

const ExpenseEntry = ({ expenseData, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={onSubmit} className='expense-entry-form'>
            <label>
                Date:
                <input 
                    type="date" 
                    name="date" 
                    value={expenseData.date} 
                    onChange={onChange} 
                />
            </label>
            <br />
            <label>
                Description:
                <input 
                    type="text" 
                    name="description" 
                    value={expenseData.description} 
                    onChange={onChange} 
                />
            </label>
            <br />
            <label>
                Amount:
                <input 
                    type="number" 
                    name="amount" 
                    value={expenseData.amount} 
                    onChange={onChange} 
                />
            </label>
            <br />
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ExpenseEntry;
