import React, { useEffect, useState } from "react";
import strings from "../locale/strings";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [color, setColor] = useState("#FCBE44");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Error loading categories");
      setCategories([]);
    }
    setLoading(false);
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, type, color }),
      });
      if (res.ok) {
        setMessage("Category added!");
        setName("");
        setType("expense");
        setColor("#FCBE44");
        fetchCategories();
      } else {
        setMessage("Error adding category");
      }
    } catch (err) {
      setMessage("Error adding category");
    }
    setLoading(false);
  }

  async function handleDeleteCategory(id) {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8080/api/category/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage("Category deleted!");
        fetchCategories();
      } else {
        setMessage("Error deleting category");
      }
    } catch (err) {
      setMessage("Error deleting category");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        {t.categories}
      </h2>
      <form onSubmit={handleAddCategory} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          className="form-input"
          placeholder={t.categories + " Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="form-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">{t.totalIncome}</option>
          <option value="expense">{t.totalExpenses}</option>
        </select>
        <input
          type="color"
          className="form-input h-10 w-20 p-0 border-none"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold text-white ${
            loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? t.categories + "..." : t.categories}
        </button>
        {message && <div className="text-center text-green-600">{message}</div>}
      </form>
      <h3 className="text-lg font-bold mb-2 text-purple-700">{t.categories}</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="py-2 flex items-center gap-2 justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: cat.color }}
                ></span>
                <span className="font-semibold">{cat.name}</span>
                <span className="text-xs text-gray-500">({cat.type})</span>
              </div>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="text-red-500 hover:underline text-xs"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
