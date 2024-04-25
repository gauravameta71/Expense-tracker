
import React from "react";

const ExpenseList = ({ expenses, onRemoveExpense }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Expenses:</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 border-b border-gray-300 py-2"
            >
              <div>
                <p className="font-semibold">{expense.description}</p>
                <p>
                  Amount: ₹{expense.amount.toFixed(2)} - Date:{" "}
                  {new Date(expense.date).toLocaleDateString()} - Category:{" "}
                  {expense.category}
                </p>
              </div>
              <button
                onClick={() => onRemoveExpense(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;