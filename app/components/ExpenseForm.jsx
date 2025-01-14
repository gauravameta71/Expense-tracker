"use client";
import { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({
      description,
      amount: parseFloat(amount),
      date,
      category,
    });
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Expense Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;