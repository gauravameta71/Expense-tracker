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

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const addEmployee = (employee, month) => {
    if (!employee.name || !employee.salary || !month) {
      setError("Please enter name, salary, and month to add an employee.");
      return;
    }
    const existingEmployee = employees.find(
      (emp) => emp.name === employee.name && emp.month === month
    );
    if (existingEmployee) {
      setError(`Employee ${employee.name} already exists for month ${month}.`);
      return;
    }
    setEmployees([
      ...employees,
      { ...employee, expenses: [], month: month.toString() },
    ]);
    setError("");
  };

  const addExpense = (employeeIndex, expense) => {
    if (
      !expense.description ||
      !expense.amount ||
      !expense.date ||
      !expense.category
    ) {
      setError("Please enter all fields to add an expense.");
      return;
    }
    const updatedEmployees = [...employees];
    updatedEmployees[employeeIndex].expenses.push(expense);
    setEmployees(updatedEmployees);
    setError("");
  };

  const removeExpense = (employeeIndex, expenseIndex) => {
    const updatedEmployees = [...employees];
    updatedEmployees[employeeIndex].expenses.splice(expenseIndex, 1);
    setEmployees(updatedEmployees);
  };

  const removeEmployee = (employeeIndex) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(employeeIndex, 1);
    setEmployees(updatedEmployees);
  };

  const calculateSavings = (employee) => {
    const totalExpenses = employee.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return employee.salary - totalExpenses;
  };

  const filterExpensesByMonth = (expenses, month) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() + 1 === parseInt(month);
    });
  };

  const uniqueCategories = [
    ...new Set(
      employees.flatMap((employee) =>
        employee.expenses.map((expense) => expense.category)
      )
    ),
  ];

  return (
    <div className="container mx-auto p-20 h-screen">
      <div className="border-2 rounded-md shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <EmployeeForm onAddEmployee={addEmployee} />
        {employees.map((employee, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                {employee.name} - Salary: ₹{employee.salary.toFixed(2)} - Month:{" "}
                {new Date(0, parseInt(employee.month) - 1).toLocaleString(
                  "default",
                  {
                    month: "long",
                  }
                )}
              </h2>
              <button
                onClick={() => removeEmployee(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            <ExpenseForm
              onAddExpense={(expense) => addExpense(index, expense)}
            />
            <ExpenseList
              expenses={filterExpensesByMonth(
                employee.expenses,
                employee.month
              )}
              onRemoveExpense={(expenseIndex) =>
                removeExpense(index, expenseIndex)
              }
            />
            <div className="flex justify-between">
              <span className="font-semibold">Total Expenses:</span>
              <span>
                ₹
                {filterExpensesByMonth(employee.expenses, employee.month)
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Savings:</span>
              <span>
                ₹
                {calculateSavings({
                  ...employee,
                  expenses: filterExpensesByMonth(
                    employee.expenses,
                    employee.month
                  ),
                }).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
