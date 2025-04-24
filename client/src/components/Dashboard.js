import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import strings from "../locale/strings";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({ income: 0, expense: 0, savings: 0 });
  const [recent, setRecent] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    async function fetchData() {
      setLoading(true);
      try {
        const userRes = await fetch(
          "http://localhost:8080/api/auth/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await userRes.json();
        setUser(userData.user);

        // Helper to safely get array or []
        const safeArray = async (res) => {
          if (!res.ok) return [];
          const data = await res.json();
          return Array.isArray(data) ? data : [];
        };

        const [incomeRes, expenseRes, budgetRes, goalRes] = await Promise.all([
          fetch("http://localhost:8080/api/income", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8080/api/expense", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8080/api/budget", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8080/api/savings-goal", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const incomes = await safeArray(incomeRes);
        const expenses = await safeArray(expenseRes);
        const budgets = await safeArray(budgetRes);
        const goals = await safeArray(goalRes);

        setBudgets(budgets);
        setGoals(goals);

        const totalIncome = incomes.reduce(
          (sum, i) => sum + (i.amount || 0),
          0
        );
        const totalExpense = expenses.reduce(
          (sum, e) => sum + (e.amount || 0),
          0
        );
        setSummary({
          income: totalIncome,
          expense: totalExpense,
          savings: totalIncome - totalExpense,
        });

        const recentTx = [
          ...incomes.map((i) => ({ ...i, type: "income" })),
          ...expenses.map((e) => ({ ...e, type: "expense" })),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecent(recentTx);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        alert("Failed to load dashboard data.");
        setBudgets([]);
        setGoals([]);
        setSummary({ income: 0, expense: 0, savings: 0 });
        setRecent([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (!budgets.length && !goals.length) return;
    const notifs = [];
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    budgets.forEach((budget) => {
      if (budget.month === thisMonth) {
        const total = recent
          .filter(
            (tx) =>
              tx.type === "expense" &&
              tx.category === budget.category &&
              new Date(tx.date).getMonth() === now.getMonth()
          )
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        if (total > budget.amount) {
          notifs.push({
            type: "budget",
            message: `You have exceeded your budget for ${budget.category} this month!`,
          });
        }
      }
    });

    goals.forEach((goal) => {
      if (goal.dueDate) {
        const due = new Date(goal.dueDate);
        const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 7 && goal.currentAmount < goal.targetAmount) {
          notifs.push({
            type: "goal",
            message: `Savings goal "${goal.name}" is due in ${daysLeft} day(s)!`,
          });
        }
      }
      if (goal.currentAmount >= goal.targetAmount) {
        notifs.push({
          type: "goal",
          message: `Congratulations! You achieved your savings goal "${goal.name}".`,
        });
      }
    });

    setNotifications(notifs);
  }, [budgets, goals, recent]);

  function exportToCSV(transactions) {
    if (!transactions.length) return;
    const header = Object.keys(transactions[0]);
    const csvRows = [header.join(",")];
    for (const row of transactions) {
      csvRows.push(
        header.map((field) => JSON.stringify(row[field] ?? "")).join(",")
      );
    }
    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "transactions.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function exportAllToCSV() {
    const token = localStorage.getItem("token");
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch("http://localhost:8080/api/income", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/api/expense", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const incomes = await incomeRes.json();
      const expenses = await expenseRes.json();
      const allTx = [
        ...incomes.map((i) => ({ ...i, type: "income" })),
        ...expenses.map((e) => ({ ...e, type: "expense" })),
      ];
      if (!allTx.length) return;
      exportToCSV(allTx);
    } catch (err) {
      alert("Error exporting all transactions");
    }
  }

  function exportAllToPDF() {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("http://localhost:8080/api/income", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:8080/api/expense", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([incomeRes, expenseRes]) => {
        const incomes = await incomeRes.json();
        const expenses = await expenseRes.json();
        const allTx = [
          ...incomes.map((i) => ({ ...i, type: "income" })),
          ...expenses.map((e) => ({ ...e, type: "expense" })),
        ];
        if (!allTx.length) return;
        const doc = new jsPDF();
        doc.text("All Transactions Report", 14, 16);
        const tableColumn = Object.keys(allTx[0]);
        const tableRows = allTx.map((row) =>
          tableColumn.map((field) => row[field] ?? "")
        );
        doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
        doc.save("all_transactions.pdf");
      })
      .catch(() => {
        alert("Error exporting all transactions as PDF");
      });
  }

  if (loading)
    return <div className="text-center py-10">{t.loadingDashboard}</div>;
  if (!user) return null;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
        {t.welcome}, {user.fullName}
      </h1>

      {notifications.length > 0 && (
        <div className="mb-6">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <ul className="space-y-2">
              {notifications.map((notif, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span role="img" aria-label="alert">
                    ⚠️
                  </span>{" "}
                  {notif.type === "budget"
                    ? `${t.exceededBudget} ${notif.message.split("for ")[1]}`
                    : notif.type === "goal" && notif.message.includes("due in")
                    ? `${t.goalDue} ${notif.message.split('"')[1]} ${t.days}`
                    : notif.message.includes("achieved")
                    ? `${t.goalAchieved} ${notif.message.split('"')[1]}`
                    : notif.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-purple-700">
            {t.totalIncome}
          </div>
          <div className="text-2xl font-bold text-green-600">
            ₹ {summary.income}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-purple-700">
            {t.totalExpenses}
          </div>
          <div className="text-2xl font-bold text-red-500">
            ₹ {summary.expense}
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow text-center">
          <div className="text-lg font-semibold text-purple-700">
            {t.savings}
          </div>
          <div className="text-2xl font-bold text-blue-600">
            ₹ {summary.savings}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            {t.recentTransactions}
          </h2>
          {recent.length > 0 ? (
            <ul>
              {recent.map((tx, idx) => (
                <li
                  key={tx._id || idx}
                  className="flex justify-between py-2 border-b last:border-b-0"
                >
                  <span
                    className={
                      tx.type === "income" ? "text-green-600" : "text-red-500"
                    }
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount}{" "}
                    {tx.source || tx.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">{t.noRecentTransactions}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            {t.savingsGoals}
          </h2>
          <ul>
            {goals.map((goal) => (
              <li key={goal._id} className="mb-2 p-2 bg-blue-50 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{goal.name}</span>
                  <span className="text-xs text-gray-500">
                    {t.target}: ₹{goal.targetAmount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
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
                  {t.progress}: ₹{goal.currentAmount} / ₹{goal.targetAmount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-purple-700">{t.budgets}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <li
              key={budget._id}
              className="bg-yellow-50 p-4 rounded shadow flex flex-col gap-2"
            >
              <span className="font-semibold">{budget.category}</span>
              <span className="text-xs text-gray-500">
                {t.month}: {budget.month}
              </span>
              <span className="text-xs text-gray-700">
                {t.budget}: ₹{budget.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={() => navigate("/expenseTrack")}
          className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700 transition"
        >
          {t.addExpense}
        </button>
        <button
          onClick={() => navigate("/expenseTrack")}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          {t.addIncome}
        </button>
        <button
          onClick={() => exportToCSV([...recent])}
          className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          {t.exportRecentCSV}
        </button>
        <button
          onClick={exportAllToCSV}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          {t.exportAllCSV}
        </button>
        <button
          onClick={exportAllToPDF}
          className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition"
        >
          {t.exportAllPDF}
        </button>
      </div>

      <div className="mt-12"></div>
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        {t.financialOverview}
      </h2>
      <div className="bg-gray-100 p-8 rounded text-center text-gray-500">
        {t.chartsComingSoon}
      </div>
    </div>
  );
}
