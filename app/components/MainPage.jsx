"use client";
import { useState, useMemo } from "react";
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState({});
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
    const savings = employee.salary - totalExpenses;
    return savings;
  };

  useMemo(() => {
    const monthlySavingsData = {};
    employees.forEach((employee) => {
      const month = employee.month;
      const savings = calculateSavings(employee);
      monthlySavingsData[month] = (monthlySavingsData[month] || 0) + savings;
    });
    setMonthlySavings(monthlySavingsData);
  }, [employees]);

  const filterExpensesByMonth = (expenses, month) => {
  if (!expenses || expenses.length === 0) {
    return [];
  }

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

  const renderMonthlySavings = () => {
    const totalSavings = Object.values(monthlySavings).reduce(
      (sum, savings) => sum + savings,
      0
    );

    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Monthly Savings:</h3>
        {Object.entries(monthlySavings).length === 0 ? (
          <p>No savings data available.</p>
        ) : (
          <>
            {Object.entries(monthlySavings).map(([month, savings]) => (
              <div key={month} className="flex justify-between mb-2">
                <span>
                  {new Date(0, parseInt(month) - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </span>
                <span>₹{savings.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 border-t border-gray-300 pt-2">
              <span className="font-semibold">Total Savings:</span>
              <span>₹{totalSavings.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    );
  };

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
        {renderMonthlySavings()}
      </div>
    </div>
  );
};

export default Home;
