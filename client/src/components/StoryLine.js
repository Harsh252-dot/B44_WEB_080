import React, { useState } from 'react';
import kate_story from "../assets/expenses-rafiki.png";
import about_kate from "../assets/About-kate.png";
import budget from "../assets/Calculator-pana.png";
import needsAndwants from "../assets/needs and wants.jpeg";
import envelop from "../assets/envelop.png";

const KateStory = ({ onNext }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Isha's Story</h1>
    <img src={kate_story} alt="Isha" className="float-left mr-4" width="400" height="400" />
    <p>
      Isha just got accepted into college, but knows nothing about managing her finances. She is working part-time at a local library for Rs. 15 per hour, working for 5 hours a week. After tax and deductions she takes home Rs. 250.
    </p>
    <p>
      In addition, her parents are providing her an allowance of Rs. 100 every month, plus she’s saving on rent by staying at home. Starbucks coffee at least 3 times is a must for Isha and eating out once a week. Occasionally, she will go out with friends and spend money on entertainment.
    </p>
    <p>
      Isha has played guitar her entire life and wanted to save up for a new electric guitar, with her own money, for her band performance in 2 months. Help Isha figure out her current financial situation and determine if she will have enough in before her performance!
    </p>
    <button onClick={onNext} className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Next</button>
  </div>
);

const IncomeExpenses = ({ onNext }) => {
  const nextButton = () => {
    // Display correct answers
    document.getElementById("jobsContainer").innerText = document.getElementById("jobDropdown").value === "Income" ? "Correct!" : "Wrong!";
    document.getElementById("allowanceContainer").innerText = document.getElementById("allowanceDropdown").value === "Income" ? "Correct!" : "Wrong!";
    document.getElementById("foodContainer").innerText = document.getElementById("foodDropdown").value === "Expenses" ? "Correct!" : "Wrong!";
    document.getElementById("starbucksContainer").innerText = document.getElementById("starbucksDropdown").value === "Expenses" ? "Correct!" : "Wrong!";
    document.getElementById("friendContainer").innerText = document.getElementById("friendDropdown").value === "Expenses" ? "Correct!" : "Wrong!";
    document.getElementById("resultsContainer").innerText = document.getElementById("tuitionDropdown").value === "Expenses" ? "Correct!" : "Wrong!";
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Step 1: Income and Expenses</h2>
      <hr className="mb-4" />
      <h4 className="text-xl mb-2">How much do you <i>make</i> and how much do you <i>spend</i>?</h4>
      <p>
        Before starting your budgeting journey, it is essential to know your income and expenses.
      </p>
      <p>
        <b>Income: </b> Think of all the means that you get money <br /><b>Expenses: </b> Think of all the ways you spend the money you got from your incomes
      </p>
      <p>
        Help Isha identify which of her situations is an income or an expense:
      </p>
      <img src={about_kate} alt="Expenses" className="float-left mr-4" width="400" height="400" />
      <form>
        <div className="mb-4">
          <label className="block">Part-Time Job</label>
          <select name="type" className="form-select" id="jobDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="jobsContainer" className="text-red-500"></span>
        </div>
        <div className="mb-4">
          <label className="block">Allowance</label>
          <select name="type" className="form-select" id="allowanceDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="allowanceContainer" className="text-red-500"></span>
        </div>
        <div className="mb-4">
          <label className="block">Eating out</label>
          <select name="type" className="form-select" id="foodDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="foodContainer" className="text-red-500"></span>
        </div>
        <div className="mb-4">
          <label className="block">Buying Starbucks</label>
          <select name="type" className="form-select" id="starbucksDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="starbucksContainer" className="text-red-500"></span>
        </div>
        <div className="mb-4">
          <label className="block">Going out with friends</label>
          <select name="type" className="form-select" id="friendDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="friendContainer" className="text-red-500"></span>
        </div>
        <div className="mb-4">
          <label className="block">College supply</label>
          <select name="type" className="form-select" id="tuitionDropdown">
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <span id="resultsContainer" className="text-red-500"></span>
        </div>
      </form>
      <div className="flex space-x-4">
        <button id="nextButton" onClick={nextButton} className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Check Answer</button>
        <button onClick={onNext} className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Next</button>
      </div>
    </div>
  );
};

const NeedsWants = ({ onNext }) => {
  const checkNeedsVsWants = () => {
    const results = [
      { name: "starbucks", correct: "Want" },
      { name: "phone", correct: "Need" },
      { name: "car", correct: "Need" },
      { name: "bus", correct: "Need" },
      { name: "restaurants", correct: "Want" },
      { name: "paint", correct: "Want" },
    ];

    results.forEach(({ name, correct }) => {
      const radios = document.getElementsByName(name);
      radios.forEach(radio => {
        if (radio.checked) {
          const resultText = radio.value === correct ? "Correct!" : "Wrong!";
          document.getElementById(`${name}-score`).innerText = resultText;
        }
      });
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Identifying Needs and Wants</h2>
      <hr className="mb-4" />
      <h4 className="text-xl mb-2">Do you really <i>need</i> it, or do you just <i>want</i> it?</h4>
      <p>
        Identifying your current needs and wants is one of the most important things in your financial journey.
      </p>
      <img src={needsAndwants} alt="Needs and Wants" className="float-left mr-4" width="400" />
      <h6 className="font-bold mt-4">Definitions</h6>
      <p>
        <b>Need:</b> A necessity, something required, something essential for life <br />
        <b>Want:</b> A desire, something wished for, something non-essential
      </p>
      <h6 className="font-bold mt-4">In Real Life</h6>
      <p>
        Using these definitions, "a roof over my head" is a need. So are clothing, food, tools for work and medications. "A vacation" is a want, and so are meals in restaurants, video games, gym memberships and designer shoes.
        <br />
        Of course, one person's want may be another person's need. For Samantha, who lives near a bus route, a car may be a luxury, while for Sam, who doesn't have access to public transit and can't cycle to work, a car may be a necessity.
        <br />
        By learning how to differentiate between wants and needs, you can save money for retirement and emergencies, or for saving up to buy something that you really want.
      </p>
      <p>For Isha, identify the following as needs or wants so she can cut down on her expenses to save up for a guitar:</p>
      <table className="table-auto w-3/4">
        <thead>
          <tr>
            <th></th>
            <th>Want</th>
            <th>Need</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buying Starbucks 4 times a week</td>
            <td><input type="radio" name="starbucks" value="Want" /></td>
            <td><input type="radio" name="starbucks" value="Need" /></td>
            <td><p id="starbucks-score"></p></td>
          </tr>
          <tr>
            <td>A cellphone plan to call friends and family</td>
            <td><input type="radio" name="phone" value="Want" /></td>
            <td><input type="radio" name="phone" value="Need" /></td>
            <td><p id="phone-score"></p></td>
          </tr>
          <tr>
            <td>A car to drive to school</td>
            <td><input type="radio" name="car" value="Want" /></td>
            <td><input type="radio" name="car" value="Need" /></td>
            <td><p id="car-score"></p></td>
          </tr>
          <tr>
            <td>Bus fare to ride the bus to school</td>
            <td><input type="radio" name="bus" value="Want" /></td>
            <td><input type="radio" name="bus" value="Need" /></td>
            <td><p id="bus-score"></p></td>
          </tr>
          <tr>
            <td>Going out to eat with her friends at a restaurant</td>
            <td><input type="radio" name="restaurants" value="Want" /></td>
            <td><input type="radio" name="restaurants" value="Need" /></td>
            <td><p id="restaurants-score"></p></td>
          </tr>
          <tr>
            <td>Paint supplies to make arts and crafts</td>
            <td><input type="radio" name="paint" value="Want" /></td>
            <td><input type="radio" name="paint" value="Need" /></td>
            <td><p id="paint-score"></p></td>
          </tr>
        </tbody>
      </table>
      <div className="flex space-x-4 mt-4">
        <button onClick={checkNeedsVsWants} className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Check Answer</button>
        <button onClick={onNext} className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">Next</button>
      </div>
    </div>
  );
};

const Budgeting = () => {
  const [drinks, setDrinks] = useState(0);
  const [eatOut, setEatOut] = useState(0);
  const [friends, setFriends] = useState(0);
  const [bus, setBus] = useState(0);

  const calculate = () => {
    const revisedExpenses = drinks * 6 * 4 + eatOut + friends + bus * 5 * 4;
    const leftover = 350 - revisedExpenses;
    const summary = `Revised Expenses: Rs. ${revisedExpenses}. Monthly Leftover: Rs. ${leftover}.`;
    document.getElementById('summary').innerText = summary;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Step 3: Let's Budget!!</h2>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <img src={budget} alt="Calculator" width="250" height="250" className="mb-4" />
          <p>
            A budget is a comparison of income and expenses. It's an organized way to manage your money.
          </p>
        </div>
        <div className="flex-1">
          <div className="card bg-red-200 p-4 mb-4">
            <p><b>Isha's current monthly finance summary</b></p>
            <p>Total Income: Rs. 350</p>
            <p>Total Expenses: Rs. 342</p>
            <ul>
              <li>phone bill: Rs. 30</li>
              <li>Starbucks drink: Rs. 72 (Rs. 6 X 4 per week)</li>
              <li>going out with friends: Rs. 100 (Rs. 25 per week)</li>
              <li>bus fare: Rs. 80 (Rs. 4 X 5 per week)</li>
              <li>dining out: Rs. 60 (Rs. 15 per week)</li>
            </ul>
            <hr />
            <p id="leftover">Monthly Leftover: Rs. 8</p>
            <p>Price of guitar Isha wants: Rs. 240</p>
          </div>
        </div>
      </div>
      <img src={envelop} alt="Envelope" width="100" height="100" className="mb-4" />
      <p>
        The envelope method! An easy and simple method for managing your cash flow and your spending is the envelope system. The advantage of the envelope system is that the money is allocated in advance, so there are pre-set limits to how much you can spend in any one category each month.
        <br />
        Help Isha decide how much her expenses should be so she can buy her new guitar! Fill in the empty blanks accordingly and click the calculate button to find out whether she can afford to buy her guitar or not!
      </p>
      <div className="mb-4">
        <p>
          Isha could buy her favorite Rs. 6 Starbucks drink
          <input type="number" value={drinks} onChange={(e) => setDrinks(e.target.value)} className="ml-2 p-2 border" min="0" max="50" />
          times a week.
        </p>
        <p>
          Isha should try to spend a maximum of Rs.
          <input type="number" value={eatOut} onChange={(e) => setEatOut(e.target.value)} className="ml-2 p-2 border" min="0" max="200" />
          for dining out weekly.
        </p>
        <p>
          Isha can spend no more than Rs.
          <input type="number" value={friends} onChange={(e) => setFriends(e.target.value)} className="ml-2 p-2 border" min="0" max="200" />
          weekly when going out with her friends.
        </p>
        <p>
          Isha can bike to school
          <input type="number" value={bus} onChange={(e) => setBus(e.target.value)} className="ml-2 p-2 border" min="0" max="50" />
          times a week instead of busing to save the Rs. 5 bus fare she pays.
        </p>
      </div>
      <button onClick={calculate} className="btn btn-success mb-4">Calculate revised expenses!</button>
      <div className="modal" id="resultModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Revised Expenses</h5>
            </div>
            <div className="modal-body">
              <p id="summary"></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500" data-dismiss="modal">Redo Budget</button>
              <button type="button" className="mt-8  ml-5 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500" onClick={() => window.location.href='storyLineOptions.html'}>Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryLine = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      <div className="pt-20">
        {step === 1 && <KateStory onNext={nextStep} />}
        {step === 2 && <IncomeExpenses onNext={nextStep} />}
        {step === 3 && <NeedsWants onNext={nextStep} />}
        {step === 4 && <Budgeting />}
      </div>
    </div>
  );
};

export default StoryLine;
