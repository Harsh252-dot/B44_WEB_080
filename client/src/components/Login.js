import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import strings from "../locale/strings";

export default function Login() {
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
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-white via-purple-50 to-indigo-50 p-8 border border-gray-200 rounded-2xl shadow-2xl mt-12">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-wide drop-shadow-lg">
          {t.login}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors text-lg ${
              loading
                ? "bg-purple-300"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? t.login + "..." : t.login}
          </button>
          {message && (
            <div className="mb-4 text-center text-red-600 font-medium animate-pulse">
              {message}
            </div>
          )}
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          {t.signIn}{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer font-semibold"
            onClick={() => navigate("/signIn")}
          >
            {t.signIn}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}
