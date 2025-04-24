import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Level from "../assets/Level1.jpeg";
import Quiz from "./Quiz";
import LeaderBoard from "./LeaderBoard";
import Footer from "./Footer";
import level_1 from "../assets/level1 copy.jpeg";
import level_2 from "../assets/level2.jpeg";
import level_3 from "../assets/level3.jpeg";
import level_4 from "../assets/level4.jpeg";
import level_5 from "../assets/level5.jpeg";
import level_6 from "../assets/level6.jpeg";

  


export default function ChooseModule()
{
    const [currentLevel, setCurrentLevel] = useState(null);

    const startLevel = (level) => {
      setCurrentLevel(level);
    };
  
    if (currentLevel) {
      return <Quiz level={currentLevel} goBack={() => setCurrentLevel(null)} />;
    }
    return(
<>
        <div className="container mx-auto py-10">
    <h1 className="text-4xl font-bold text-center mb-10">FinGuru Quizes</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_1} alt="Level 1" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 1</h2>
          <p className="text-gray-600">Foundation Fundamentals</p>
          
          <button
              type="button"
              onClick={() => startLevel("level1")}
              className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded"
            >
              Start Level
            </button>   </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_2} alt="Level 2" className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 2</h2>
          <p className="text-gray-600">Smart Spending</p>
          <button
              type="button"
              onClick={() => startLevel("level2")}
              className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded"
            >
              Start Level
            </button>        </div>
      </div>
     
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_3} alt="Level 3" className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 3</h2>
          <p className="text-gray-600">Investment Insights</p>
          <a href="#" className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded">Start Level</a>
        </div>
      </div>
     
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_4} alt="Level 4" className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 4</h2>
          <p className="text-gray-600">Debt Dynamics</p>
          <a href="#" className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded">Start Level</a>
        </div>
      </div>
     
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_5} alt="Level 5" className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 5</h2>
          <p className="text-gray-600">Future Planning</p>
          <a href="#" className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded">Start Level</a>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={level_6} alt="Level 6" className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h2 className="text-xl font-bold">Level 6</h2>
          <p className="text-gray-600">Wealth Wisdom</p>
          <a href="#" className="mt-4 inline-block bg-purple-500 text-white py-2 px-4 rounded">Start Level</a>
        </div>
      </div>
    </div>

    <LeaderBoard/>
    
  </div>
  <Footer/>
  </>

    );
}