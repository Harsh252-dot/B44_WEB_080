import React, { useEffect, useState } from "react";
import strings from "../locale/strings";

export default function BudgetManager() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  useEffect(() => {
    fetchBudgets();
  }, []);

  async function fetchBudgets() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBudgets(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Error loading budgets");
      setBudgets([]);
    }
    setLoading(false);
  }

  async function handleAddBudget(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, amount, month }),
      });
      if (res.ok) {
        setMessage("Budget added!");
        setCategory("");
        setAmount("");
        setMonth("");
        fetchBudgets();
      } else {
        setMessage("Error adding budget");
      }
    } catch (err) {
      setMessage("Error adding budget");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-purple-50 to-indigo-50 p-8 rounded-2xl shadow-2xl mt-8">
      <h2 className="text-2xl font-extrabold text-purple-700 mb-6 text-center tracking-wide drop-shadow-lg">
        {t.budgets}
      </h2>
      <form onSubmit={handleAddBudget} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base shadow-sm"
          placeholder={t.categories + " (e.g. Groceries)"}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base shadow-sm"
          placeholder={t.budget || "Amount"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="month"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base shadow-sm"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors ${
            loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? t.budgets + "..." : t.budgets}
        </button>
        {message && (
          <div className="text-center text-green-600 font-medium animate-pulse">
            {message}
          </div>
        )}
      </form>
      <h3 className="text-lg font-bold mb-4 text-purple-700 text-center">
        {t.budgets}
      </h3>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {budgets.map((budget) => (
            <li
              key={budget._id}
              className="py-3 flex flex-col sm:flex-row justify-between items-center gap-2 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <span className="font-semibold text-purple-800">
                {budget.category}
              </span>
              <span className="text-xs text-gray-500">{budget.month}</span>
              <span className="text-gray-700 font-bold">₹{budget.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
