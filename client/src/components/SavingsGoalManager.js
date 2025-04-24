import React, { useEffect, useState } from "react";
import strings from "../locale/strings";

export default function SavingsGoalManager() {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/savings-goal", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Error loading savings goals");
      setGoals([]);
    }
    setLoading(false);
  }

  async function handleAddGoal(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/savings-goal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, targetAmount, dueDate }),
      });
      if (res.ok) {
        setMessage("Savings goal added!");
        setName("");
        setTargetAmount("");
        setDueDate("");
        fetchGoals();
      } else {
        setMessage("Error adding savings goal");
      }
    } catch (err) {
      setMessage("Error adding savings goal");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-2xl shadow-2xl mt-8">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-wide drop-shadow-lg">
        {t.savingsGoals}
      </h2>
      <form onSubmit={handleAddGoal} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
          placeholder={t.savingsGoals + " Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
          placeholder={t.target || "Target Amount"}
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
        <input
          type="date"
          className="form-input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? t.savingsGoals + "..." : t.savingsGoals}
        </button>
        {message && (
          <div className="text-center text-green-600 font-medium animate-pulse">
            {message}
          </div>
        )}
      </form>
      <h3 className="text-lg font-bold mb-4 text-blue-700 text-center">
        {t.savingsGoals}
      </h3>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <li
              key={goal._id}
              className="py-3 flex flex-col gap-1 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800">{goal.name}</span>
                <span className="text-xs text-gray-500">
                  Due:{" "}
                  {goal.dueDate
                    ? new Date(goal.dueDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (goal.currentAmount / goal.targetAmount) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Progress: ₹{goal.currentAmount} / ₹{goal.targetAmount}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
