import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/FinGuru_logo.png";
import strings from "../locale/strings";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(() =>
    document.body.classList.contains("dark")
  );
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const t = strings[lang];
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:8080/api/auth/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
          else setUser(null);
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const toggleDark = () => {
    document.body.classList.toggle("dark");
    setDark(document.body.classList.contains("dark"));
  };

  const handleLangChange = (e) => {
    setLang(e.target.value);
    localStorage.setItem("lang", e.target.value);
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link-active" : "nav-link-top";
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-700 shadow-2xl sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={logo}
                  alt="BudgetIQ Logo"
                  className="relative h-12 w-12 rounded-full shadow-lg border-2 border-white"
                />
              </div>
              <span className="font-extrabold text-2xl md:text-3xl text-white tracking-wide group-hover:text-purple-200 transition duration-300 drop-shadow-lg">
                BudgetIQ
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 hover:bg-purple-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3 text-base font-medium">
            <Link to="/" className={isActive("/")}>
              {t.home}
            </Link>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/expenseTrack" className={isActive("/expenseTrack")}>
              {t.expenseTracker}
            </Link>
            <Link to="/budgets" className={isActive("/budgets")}>
              {t.budgetsNav}
            </Link>
            <Link to="/savings-goals" className={isActive("/savings-goals")}>
              {t.savingsGoalsNav}
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="nav-link-top flex items-center gap-1"
              >
                {t.categories}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    catOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fade-in border border-gray-200 dark:border-gray-700">
                  <Link to="/categories" className="dropdown-link">
                    {t.categories}
                  </Link>
                  <Link to="/recurring" className="dropdown-link">
                    {t.recurring}
                  </Link>
                  <Link to="/gameHome" className="dropdown-link">
                    {t.gamifiedLearning}
                  </Link>
                  <Link to="/chooseModule" className="dropdown-link">
                    {t.quizzes}
                  </Link>
                  <Link to="/leaderBoard" className="dropdown-link">
                    {t.leaderboard}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 rounded-md bg-purple-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                value={lang}
                onChange={handleLangChange}
                title="Select language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              className="toggle-dark p-2 rounded-full bg-purple-700 text-white hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              onClick={toggleDark}
              title="Toggle dark mode"
            >
              {dark ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {!isLoggedIn && (
              <div className="flex items-center gap-2">
                <Link
                  to="/signIn"
                  className="text-base font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-all duration-300"
                >
                  {t.signIn}
                </Link>
                <Link
                  to="/login"
                  className="text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow transition-all duration-300"
                >
                  {t.login}
                </Link>
              </div>
            )}

            {/* User Profile */}
            {isLoggedIn && user && (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-white leading-tight">
                    {user.fullName}
                  </span>
                  <span className="text-xs text-purple-200">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md shadow transition-all duration-300"
                >
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-800 to-indigo-800 shadow-2xl rounded-b-2xl animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="mobile-nav-link">
              {t.home}
            </Link>
            <Link to="/dashboard" className="mobile-nav-link">
              Dashboard
            </Link>
            <Link to="/expenseTrack" className="mobile-nav-link">
              {t.expenseTracker}
            </Link>
            <Link to="/budgets" className="mobile-nav-link">
              {t.budgetsNav}
            </Link>
            <Link to="/savings-goals" className="mobile-nav-link">
              {t.savingsGoalsNav}
            </Link>

            {/* Categories Submenu */}
            <div className="pl-4 space-y-1 border-l-2 border-purple-600">
              <span className="block text-sm font-medium text-purple-200 px-3 py-2">
                {t.categories}
              </span>
              <Link to="/categories" className="mobile-nav-link">
                {t.categories}
              </Link>
              <Link to="/recurring" className="mobile-nav-link">
                {t.recurring}
              </Link>
              <Link to="/gameHome" className="mobile-nav-link">
                {t.gamifiedLearning}
              </Link>
              <Link to="/chooseModule" className="mobile-nav-link">
                {t.quizzes}
              </Link>
              <Link to="/leaderBoard" className="mobile-nav-link">
                {t.leaderboard}
              </Link>
            </div>

            {/* Mobile User Controls */}
            <div className="pt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3">
                <label className="text-sm font-medium text-purple-200">
                  Language
                </label>
                <select
                  className="bg-purple-700 text-white rounded-md px-2 py-1 text-sm"
                  value={lang}
                  onChange={handleLangChange}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>

              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium text-purple-200">
                  Theme
                </span>
                <button
                  onClick={toggleDark}
                  className="bg-purple-700 text-white rounded-md px-3 py-1 text-sm flex items-center gap-2"
                >
                  {dark ? (
                    <>
                      <span>🌙</span> Dark
                    </>
                  ) : (
                    <>
                      <span>☀️</span> Light
                    </>
                  )}
                </button>
              </div>

              {isLoggedIn && user && (
                <div className="mt-3 px-3 py-2 bg-purple-700/30 rounded-md">
                  <div className="text-sm font-medium text-white">
                    {user.fullName}
                  </div>
                  <div className="text-xs text-purple-200">{user.email}</div>
                </div>
              )}

              {!isLoggedIn ? (
                <div className="flex gap-2 px-3 pt-2">
                  <Link
                    to="/signIn"
                    className="flex-1 text-center text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md"
                  >
                    {t.signIn}
                  </Link>
                  <Link
                    to="/login"
                    className="flex-1 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md"
                  >
                    {t.login}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="mx-3 text-center text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                >
                  {t.logout}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
