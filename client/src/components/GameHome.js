import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import isha_icon from "../assets/Learning.png";
import aditya_icon from "../assets/Work.png";
import aarohi_icon from "../assets/Wfh.png";
import vedashri_icon from "../assets/Old.png";
import forum_1 from "../assets/forum1.png";
import forum_2 from "../assets/forum2.png";
import forum_3 from "../assets/forum3.png";
import gameHome from "../assets/gameHome copy.jpeg";

export default function GameHome(){
    return(
        <>
        <section className="relative bg-gray-900 bg-opacity-50 h-screen flex items-center justify-center">
    <img
      src={gameHome}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative z-10 text-center">
      <h1 className="text-5xl font-bold text-white">Pocket Planner</h1>
      <p className="text-xl text-gray-300 mt-4">Master your money with our expert guides and resources.</p>
      <Link to="/chooseModule" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Start Learning</Link>
    </div>
  </section>

          {/* Your Progress Section */}
          <section className="py-12">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Your Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <p className="mb-8">70% Complete</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Budgeting Pro</h3>
                  <p className="text-sm text-gray-500">Earned on 10/01/2024</p>
                  <p className="mt-2">Master the art of budgeting and save more!</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Investment Guru</h3>
                  <p className="text-sm text-gray-500">Earned on 15/01/2024</p>
                  <p className="mt-2">Learned the basics of investing and portfolio management.</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Tax Expert</h3>
                  <p className="text-sm text-gray-500">Earned on 20/01/2024</p>
                  <p className="mt-2">Completed the tax filing module with excellence.</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Savings Champion</h3>
                  <p className="text-sm text-gray-500">Earned on 25/01/2024</p>
                  <p className="mt-2">Achieved your savings goal for the month.</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Samurai Saver of Month</h3>
                  <p className="text-sm text-gray-500">Earned on 25/07/2024</p>
                  <p className="mt-2">Achieved your savings goal.</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Investor of the Month</h3>
                  <p className="text-sm text-gray-500">Earned on 22/01/2024</p>
                  <p className="mt-2">Achieved your investement in SIP's.</p>
                  <div className="flex mt-2">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Course Overview Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Learn Through Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img src={isha_icon} alt="Personal Finance" className="rounded-t-lg w-full h-48 object-cover" />
                  <h3 className="font-bold mt-4">Isha's Story</h3>
                  <p className="text-gray-500 mt-2">Help Isha budget and save for a new guitar!</p>
                  <Link to="/storyLine" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Start</Link>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img src={aditya_icon} alt="Investing 101" className="rounded-t-lg w-full h-48 object-cover" />
                  <h3 className="font-bold mt-4">Aditya's Story</h3>
                  <p className="text-gray-500 mt-2">Help Aditya choose an insurance company that fits his needs!</p>
                  <a href="#" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Start</a>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img src={aarohi_icon} alt="Tax Filing" className="rounded-t-lg w-full h-48 object-cover" />
                  <h3 className="font-bold mt-4">Aarohi's Income Tax Filing</h3>
                  <p className="text-gray-500 mt-2">Help Aarohi in Filing her Income Tax returns.</p>
                  <a href="#" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Start</a>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img src={vedashri_icon} alt="Savings" className="rounded-t-lg w-full h-48 object-cover" />
                  <h3 className="font-bold mt-4">Vedashri & Rishab</h3>
                  <p className="text-gray-500 mt-2">Help Vedarshri and Rishab where to invest their savings..!</p>
                  <a href="#" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Start</a>
                </div>
              </div>
            </div>
          </section>

          {/* Ongoing Challenges Section */}
          <section className="py-12">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Ongoing Challenges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Enhance Personal Finance</h3>
                  <p className="text-gray-500 mt-2">In Progress</p>
                  <div className="flex mt-4">
                    <span className="bg-gray-200 text-gray-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Stock Market</span>
                    <span className="bg-green-200 text-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">High Priority</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Learn ITR Filing</h3>
                  <p className="text-gray-500 mt-2">Medium Priority</p>
                  <div className="flex mt-4">
                    <span className="bg-yellow-200 text-yellow-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">ITR Filing </span>
                    <span className="bg-red-200 text-red-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">In Progress</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold">Mutual Fund Investment</h3>
                  <p className="text-gray-500 mt-2">Low Priority</p>
                  <div className="flex mt-4">
                    <span className="bg-blue-200 text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Low Risk SIP's</span>
                    <span className="bg-green-200 text-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">High Risk</span>
                    <span className="bg-red-200 text-red-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
          <section className="py-12 bg-gray-100">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Forums</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={forum_1} alt="Investing" className="w-full h-40 object-cover rounded-t-lg"/>
        <h3 className="font-bold mt-4">Investing</h3>
        <p className="text-gray-500 mt-2">Discuss strategies, tips, and tools for successful investing. Join the conversation on stock picks, portfolio management, and more.</p>
        <a href="#" className="mt-4 inline-block px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50">Join Now</a>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={forum_2} alt="Tax Filing" className="w-full h-40 object-cover rounded-t-lg"/>
        <h3 className="font-bold mt-4">Tax Filing</h3>
        <p className="text-gray-500 mt-2">Get help and advice on preparing and filing your taxes. Share your experiences and learn from others.</p>
        <a href="#" className="mt-4 inline-block px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50">Join Now</a>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={forum_3} alt="Personal Finance" className="w-full h-40 object-cover rounded-t-lg"/>
        <h3 className="font-bold mt-4">Personal Finance</h3>
        <p className="text-gray-500 mt-2">Exchange tips on budgeting, saving, and managing debt. Ask questions and get support from the community.</p>
        <a href="#" className="mt-4 inline-block px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50">Join Now</a>
      </div>
    </div>
  </div>
  
</section>
<Footer/>


  </>
    );
}