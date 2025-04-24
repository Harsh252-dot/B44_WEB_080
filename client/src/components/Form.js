import React, { useState } from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import { default as api } from "../store/apiSlice";

export default function Form() {
  const { register, handleSubmit, resetField, formState: { errors } } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const [type, setType] = useState("expense");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      await addTransaction({ ...data, type }).unwrap(); // include type
      setMessage("Transaction added!");
      resetField("name");
      resetField("amount");
    } catch (err) {
      setMessage("Error adding transaction");
    }
    setLoading(false);
  };

  return (
    <div className="form max-w-sm mx-auto w-96 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="font-bold pb-4 text-xl text-purple-700">
        Add {type === "income" ? "Income" : "Expense"}
      </h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Expense
        </button>
      </div>
      <form id="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="input-group">
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder={
              type === "income"
                ? "Source (e.g. Salary)"
                : "Expense (e.g. Groceries)"
            }
            className="form-input"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <select className="form-input" {...register("category")}>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <div className="input-group">
          <input
            type="number"
            {...register("amount", { required: "Amount is required", min: { value: 1, message: "Amount must be positive" } })}
            placeholder="Amount"
            className="form-input"
          />
          {errors.amount && (
            <span className="text-red-500 text-xs">{errors.amount.message}</span>
          )}
        </div>
        <div className="input-group">
          <input type="date" {...register("date")} className="form-input" />
        </div>
        <div className="submit-btn">
          <button
            className={`border py-2 text-white w-full ${
              loading ? "bg-purple-300" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </div>
        {message && (
          <div className="text-center text-sm text-green-600">{message}</div>
        )}
      </form>
      <List></List>
    </div>
  );
}
