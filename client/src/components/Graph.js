import React from "react";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Labels from "./Labels";
import { chart_Data, getTotal } from "../helper/helper";
import { default as api } from "../store/apiSlice";

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Graph({ incomes = [], expenses = [] }) {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  // Prepare data for Pie chart (expense by category)
  const expenseCategories = {};
  expenses.forEach((e) => {
    if (!expenseCategories[e.category]) expenseCategories[e.category] = 0;
    expenseCategories[e.category] += e.amount || 0;
  });
  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#f87171",
          "#fbbf24",
          "#34d399",
          "#60a5fa",
          "#a78bfa",
          "#f472b6",
          "#facc15",
          "#38bdf8",
          "#818cf8",
          "#f472b6",
        ],
      },
    ],
  };

  // Prepare data for Line chart (income/expense over time)
  const allDates = [...incomes, ...expenses].map((tx) => tx.date).sort();
  const uniqueDates = Array.from(
    new Set(allDates.map((d) => new Date(d).toLocaleDateString()))
  );
  const incomeByDate = uniqueDates.map((date) =>
    incomes
      .filter((i) => new Date(i.date).toLocaleDateString() === date)
      .reduce((sum, i) => sum + (i.amount || 0), 0)
  );
  const expenseByDate = uniqueDates.map((date) =>
    expenses
      .filter((e) => new Date(e.date).toLocaleDateString() === date)
      .reduce((sum, e) => sum + (e.amount || 0), 0)
  );
  const lineData = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Income",
        data: incomeByDate,
        borderColor: "#34d399",
        backgroundColor: "#bbf7d0",
        tension: 0.3,
      },
      {
        label: "Expense",
        data: expenseByDate,
        borderColor: "#f87171",
        backgroundColor: "#fecaca",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold mb-2 text-purple-700">Expense Breakdown</h3>
        <Pie data={pieData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold mb-2 text-purple-700">
          Income & Expense Over Time
        </h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}
