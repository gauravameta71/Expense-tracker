const ExpenseList = ({ expenses }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between">
              <span>{expense.description}</span>
              <span>₹{expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
