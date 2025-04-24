import React from "react";
import Graph from "./Graph";
import Form from "./Form";

export default function ExpenseTrack() {
  return (
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800 px-2 sm:px-4">
      <h1 className="text-4xl py-8 mb-10 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl shadow-xl font-extrabold tracking-wide">
        BudgetIQ Expense Tracker
      </h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300">
          <Graph />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300">
          <Form />
        </div>
      </div>
    </div>
  );
}
