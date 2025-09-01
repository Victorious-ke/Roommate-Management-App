// AddExpenseForm.jsx
return (
  <form className="add-expense-form" onSubmit={handleSubmit}>
    <h2>Add Expense</h2>
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Expense title"
    />
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Amount"
    />
    <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
      {roommates.map((r) => (
        <option key={r.id} value={r.id}>{r.name}</option>
      ))}
    </select>
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <input
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Notes (optional)"
    />
    <button type="submit">Add Expense</button>
  </form>
);
