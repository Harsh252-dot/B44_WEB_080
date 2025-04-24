import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const questions = {
  level1: [
    {
      type: "mcq",
      question: "What does 'net worth' represent in personal finance?",
      options: [
        "The total amount of cash you have",
        "Your assets minus your liabilities",
        "Your monthly income",
        "The value of your real estate properties.",
      ],
      answer: "Your assets minus your liabilities",
    },
    {
      type: "fill",
      question: "An emergency fund should ideally cover _____ months of living expenses.",
      options: ["3-6", "1-2", "6-12", "12-18"],
      answer: "3-6",
    },
    {
      type: "mcq",
      question: "What is the primary purpose of an emergency fund?",
      options: [
        "To save for a vacation",
        "To cover unexpected expenses",
        "To invest in stocks",
        "To buy luxury items",
      ],
      answer: "To cover unexpected expenses",
    },
  ],
  level2: [
    {
      type: "mcq",
      question: "What does 'net worth' represent in personal finance?",
      options: [
        "The total amount of cash you have",
        "Your assets minus your liabilities",
        "Your monthly income",
        "The value of your real estate properties.",
      ],
      answer: "Your assets minus your liabilities",
    },
    {
      type: "fill",
      question: "An emergency fund should ideally cover _____ months of living expenses.",
      options: ["3-6", "1-2", "6-12", "12-18"],
      answer: "3-6",
    },
    {
      type: "mcq",
      question: "What is the primary purpose of an emergency fund?",
      options: [
        "To save for a vacation",
        "To cover unexpected expenses",
        "To invest in stocks",
        "To buy luxury items",
      ],
      answer: "To cover unexpected expenses",
    },
  ],
};

export default function Quiz({ level, goBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions[level].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const renderQuestion = (question, index) => {
    if (question.type === "mcq") {
      return (
        <div key={index}>
          <h2 className="text-xl">{question.question}</h2>
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(index, option)}
              className="block mt-2 bg-indigo-400 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-indigo-300"
              >
              {option}
            </button>
          ))}
        </div>
      );
    } else if (question.type === "fill") {
      return (
        <div key={index}>
          <h2 className="text-xl">{question.question}</h2>
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(index, option)}
              className="block mt-2 bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-indigo-500"
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
  };

  const getScore = () => {
    let correct = 0;
    questions[level].forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });
    return correct;
  };

  const correctAnswers = getScore();
  const totalQuestions = questions[level].length;
  const percentage = (correctAnswers / totalQuestions) * 100;
  const compliments =
    percentage >= 90 ? "Ninja" : percentage >= 70 ? "Master" : "Samurai";

  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctAnswers, totalQuestions - correctAnswers],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const getIncorrectQuestions = () => {
    return questions[level].filter((question, index) => {
      return answers[index] !== question.answer;
    });
  };

  const incorrectQuestions = getIncorrectQuestions();

  if (showResults) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Results</h1>
        <div className="flex justify-center">
          <div style={{ width: "50%" }}>
            <Pie data={data} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mt-10">{compliments}</h2>
        <div className="mt-10">
          <h3 className="text-xl font-bold">Incorrect Answers:</h3>
          <ul>
            {incorrectQuestions.map((question, index) => (
              <li key={index} className="mt-2">
                <p className="font-bold">{question.question}</p>
                <p>Correct Answer: {question.answer}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={goBack}
          className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {renderQuestion(questions[level][currentQuestion], currentQuestion)}
      <button
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
        className="mt-4 bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-indigo-500"
      >
        Next
      </button>
    </div>
  );
}
