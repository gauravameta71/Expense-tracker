"use client";
import { useState } from "react";
import EmployeeForm from "@/app/components/EmployeeForm";
import ExpenseForm from "@/app/components/ExpenseForm";
import ExpenseList from "@/app/components/ExpenseList";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const addEmployee = (employee) => {
    if (!employee.name || !employee.salary) {
      setError("Please enter both name and salary to add an employee.");
      return;
    }

    setEmployees([...employees, { ...employee, expenses: [] }]);
    setError("");
  };

  const addExpense = (employeeIndex, expense) => {
    if (!expense.description || !expense.amount) {
      setError("Please enter both description and amount to add an expense.");
      return;
    }

    const updatedEmployees = [...employees];
    updatedEmployees[employeeIndex].expenses.push(expense);
    setEmployees(updatedEmployees);
    setError("");
  };

  const calculateSavings = (employee) => {
    const totalExpenses = employee.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return employee.salary - totalExpenses;
  };

  return (
    <div className="container mx-auto p-20  h-screen">
      <div className="border-2 rounded-md shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 ">Expense Tracker</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <EmployeeForm onAddEmployee={addEmployee} />
        {employees.map((employee, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {employee.name} - Salary: ₹{employee.salary.toFixed(2)}
            </h2>
            <ExpenseForm
              onAddExpense={(expense) => addExpense(index, expense)}
            />
            <ExpenseList expenses={employee.expenses} />
            <div className="flex justify-between">
              <span className="font-semibold">Total Expenses:</span>
              <span>
                ₹
                {employee.expenses
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Savings:</span>
              <span>₹{calculateSavings(employee).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
