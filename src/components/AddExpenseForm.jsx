export default function AddExpenseForm() {
  const { roommates, addExpense } = useBills();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(roommates[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!title.trim() || !amt || !paidBy) return;

    addExpense({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: amt,
      paidBy,
      date,
      notes: notes.trim() || undefined,
    });

    setTitle("");
    setAmount("");
    setNotes("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Add Expense</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
      />

      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
      />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
      >
        {roommates.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
      />

      <input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
}
