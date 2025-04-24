import React, { useEffect, useState } from "react";
import strings from "../locale/strings";

export default function RecurringTransactionManager() {
  const [recurrings, setRecurrings] = useState([]);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [nextDate, setNextDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  useEffect(() => {
    fetchRecurrings();
  }, []);

  async function fetchRecurrings() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/recurring", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRecurrings(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Error loading recurring transactions");
      setRecurrings([]);
    }
    setLoading(false);
  }

  async function handleAddRecurring(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/recurring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount,
          category,
          description,
          frequency,
          nextDate,
        }),
      });
      if (res.ok) {
        setMessage("Recurring transaction added!");
        setType("expense");
        setAmount("");
        setCategory("");
        setDescription("");
        setFrequency("monthly");
        setNextDate("");
        fetchRecurrings();
      } else {
        setMessage("Error adding recurring transaction");
      }
    } catch (err) {
      setMessage("Error adding recurring transaction");
    }
    setLoading(false);
  }

  async function handleDeleteRecurring(id) {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8080/api/recurring/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage("Recurring transaction deleted!");
        fetchRecurrings();
      } else {
        setMessage("Error deleting recurring transaction");
      }
    } catch (err) {
      setMessage("Error deleting recurring transaction");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{t.recurring}</h2>
      <form onSubmit={handleAddRecurring} className="flex flex-col gap-4 mb-6">
        <select
          className="form-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">{t.totalIncome}</option>
          <option value="expense">{t.totalExpenses}</option>
        </select>
        <input
          type="number"
          className="form-input"
          placeholder={t.amount || "Amount"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-input"
          placeholder={t.categories || "Category"}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className="form-input"
          placeholder={t.description || "Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-input"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
        <input
          type="date"
          className="form-input"
          value={nextDate}
          onChange={(e) => setNextDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold text-white ${
            loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? t.recurring + "..." : t.recurring}
        </button>
        {message && <div className="text-center text-green-600">{message}</div>}
      </form>
      <h3 className="text-lg font-bold mb-2 text-purple-700">{t.recurring}</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {recurrings.map((rec) => (
            <li key={rec._id} className="py-2 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {rec.type === "income" ? "Income" : "Expense"}: ₹{rec.amount}
                </span>
                <span className="text-xs text-gray-500">
                  {rec.frequency} | Next:{" "}
                  {rec.nextDate
                    ? new Date(rec.nextDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{rec.category}</span>
                <span>{rec.description}</span>
                <button
                  onClick={() => handleDeleteRecurring(rec._id)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
