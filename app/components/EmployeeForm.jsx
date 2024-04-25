"use client";
import { useState } from "react";

const EmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee({ name, salary: parseFloat(salary) }, month);
    setName("");
    setSalary("");
    setMonth("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded"
      />
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">Select Month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;