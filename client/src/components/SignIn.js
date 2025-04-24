import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import strings from "../locale/strings";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang") || "en";
  const t = strings[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage("Account created successfully! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
      setLoading(false);
    } catch (error) {
      setMessage("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 border border-gray-200 rounded-2xl shadow-2xl mt-12">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700 tracking-wide drop-shadow-lg">
          {t.signIn}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-700"
              htmlFor="full-name"
            >
              {t.fullName || "Full Name"}
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              type="text"
              id="full-name"
              placeholder={t.fullName || "Full Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors text-lg ${
              loading
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? t.signIn + "..." : t.signIn}
          </button>
          {message && (
            <div className="mb-4 text-center text-red-600 font-medium animate-pulse">
              {message}
            </div>
          )}
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          {t.login}?
          <span
            className="text-blue-700 hover:underline cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            {t.login}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}
