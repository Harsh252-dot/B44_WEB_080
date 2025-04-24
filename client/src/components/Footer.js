import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white pt-10 sm:mt-10 shadow-inner rounded-t-2xl">
      <div className="container mx-auto text-center pb-6 px-4">
        <div className="pb-6">
          <h2 className="text-xl font-semibold mb-2">
            Subscribe to our newsletter
          </h2>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Input your email"
              className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto flex-1 text-base"
            />
            <button className="p-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold shadow-lg transition-all w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 py-6 text-base">
          <a href="#" className="hover:text-gray-200">
            Home
          </a>
          <a href="#" className="hover:text-gray-200">
            Gamified Learning
          </a>
          <a href="#" className="hover:text-gray-200">
            Budget Planner
          </a>
          <a href="#" className="hover:text-gray-200">
            Help Center
          </a>
          <a href="#" className="hover:text-gray-200">
            Contact us
          </a>
          <a href="#" className="hover:text-gray-200">
            FAQs
          </a>
          <a href="#" className="hover:text-gray-200">
            BudgetIQ
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-400 py-6">
          <div className="relative">
            <select className="bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="text-gray-500 text-xs mt-4">
          &copy; {new Date().getFullYear()} BudgetIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
