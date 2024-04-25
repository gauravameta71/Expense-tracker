"use client";
import { useState, useMemo } from "react";
import backgroundImage from "@/public/bg.jpg"; // Import your background image


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
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" px-4 py-2 border border-gray-300 rounded"
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
      </div>
      {/* <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button> */}
      <button type="submit">
        <a href="#_" class="relative px-6 py-3 font-bold text-black group">
          <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span class="relative">Add Employee</span>
        </a>
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
      <div className="flex flex-row gap-1 ">
        <input
          type="text"
          placeholder="Expense Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 w-[110px] px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-[107px] px-4 py-2 border border-gray-300 rounded"
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
          className="w-[105px] px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="mt-4">
        <a href="#_" class="relative px-6 py-3 font-bold text-black group">
          <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span class="relative">Add Expense</span>
        </a>
      </button>
    </form>
  );
};

const ExpenseList = ({ expenses, onRemoveExpense }) => {
  return (
    <div className="mb-4 max-h-60 overflow-y-auto">
      <h3 className="text-md font-semibold mb-2">Expenses:</h3>
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
             

              <button onClick={() => onRemoveExpense(index)}>
                <a
                  href="#_"
                  class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                >
                  <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    Remove
                  </span>
                </a>
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
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() + 1 === parseInt(month);
    });
  };

  // const uniqueCategories = [
  //   ...new Set(
  //     employees.flatMap((employee) =>
  //       employee.expenses.map((expense) => expense.category)
  //     )
  //   ),
  // ];

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
    <div
      className="container mx-auto p-20 h-screen  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex bg-transparent">
        {/* Left side: EmployeeForm */}
        <div className="w-1/2 pr-6">
          <div className="border-2 rounded-md shadow-lg p-6 ">
            <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <EmployeeForm onAddEmployee={addEmployee} />
          </div>
        </div>

        {/* Right side: Remaining components */}
        <div className="w-1/2 pl-6">
          <div className="border-2 rounded-md shadow-lg p-8 h-[400px] overflow-y-auto">
            {employees.map((employee, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">
                    {employee.name} - Salary: ₹{employee.salary.toFixed(2)} -
                    Month:{" "}
                    {new Date(0, parseInt(employee.month) - 1).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}
                  </h2>
                  {/* <button
                    onClick={() => removeEmployee(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button> */}

                  <button onClick={() => removeEmployee(index)}>
                    <a
                      href="#_"
                      class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                    >
                      <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                      </span>
                      <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                      <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                        Remove
                      </span>
                    </a>
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
      </div>
    </div>
  );
};

export default Home;