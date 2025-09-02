import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { BillsProvider } from "./context/BillsProvider";
import AddExpense from "./pages/AddExpense";
import Summary from "./pages/Summary";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BillsProvider>
      <nav className="navbar">
        <h1>Roommate Expense Tracker</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Expense</Link></li>
          <li><Link to="/summary">Summary</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BillsProvider>
  );
}
