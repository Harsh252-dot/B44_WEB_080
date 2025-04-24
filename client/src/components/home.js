import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import home_page from "../assets/homepage.png";
import finacial_1 from "../assets/finacial.jpeg";
import finacial_2 from "../assets/finacial2.jpeg";
import finacial_3 from "../assets/financial3.jpeg";
import finacial_4 from "../assets/finacial4.jpeg";
import {
  FaArrowRight,
  FaChartLine,
  FaPiggyBank,
  FaCoins,
  FaCreditCard,
  FaBookOpen,
  FaRocket,
  FaRegLightbulb,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    stats: false,
    topics: false,
    cta: false,
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className={`observe-section relative overflow-hidden py-20 transition-opacity duration-1000 ${
          isVisible.hero ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-60 translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-100 rounded-full opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left lg:max-w-xl">
              <div className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-4 py-2 text-sm font-semibold mb-6 animate-pulse">
                Financial Education Reimagined
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  BudgetIQ
                </span>
              </h1>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-6">
                A New Way to{" "}
                <span className="text-indigo-600">Learn Finance!</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                We break down complicated financial topics into an easy-to-use
                platform, with the mission of teaching teens about financial
                independence and building a secure future.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#topics"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl shadow-lg font-semibold text-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
                >
                  Get Started <FaArrowRight className="ml-2" />
                </a>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 border-2 border-indigo-200 rounded-xl shadow-md font-semibold text-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  <FaBookOpen className="mr-2" /> Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>

              <img
                className="relative w-full max-w-md rounded-3xl shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-200"
                src={home_page}
                alt="Financial Literacy Illustration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white bg-opacity-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Choose BudgetIQ?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Our platform makes financial education accessible, engaging, and
              effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <FaRegLightbulb className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Simple & Clear Concepts
              </h3>
              <p className="text-gray-600">
                We break down complex financial ideas into easy-to-understand
                lessons that anyone can follow.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaRocket className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Learn by Doing
              </h3>
              <p className="text-gray-600">
                Interactive tools and real-world scenarios help you practice
                financial skills in a safe environment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChartLine className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Track Your Progress
              </h3>
              <p className="text-gray-600">
                Set goals, monitor your learning journey, and watch your
                financial knowledge grow over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="stats"
        className={`observe-section py-20 transition-all duration-1000 ${
          isVisible.stats
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Financial Education Matters
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {/* Stat 1 */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 transition-transform hover:scale-105 duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                  <FaChartLine className="text-2xl text-indigo-600" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  ₹11.5T
                </p>
                <p className="text-lg font-semibold text-indigo-700 mb-2">
                  Total Debt
                </p>
                <p className="text-gray-600">
                  Indian consumers owe this much in debt, highlighting the need
                  for better financial education.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 transition-transform hover:scale-105 duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <FaPiggyBank className="text-2xl text-green-600" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  52%
                </p>
                <p className="text-lg font-semibold text-green-600 mb-2">
                  Teens
                </p>
                <p className="text-gray-600">
                  More than half of teenagers want to learn more about managing
                  money effectively.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200 transition-transform hover:scale-105 duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                  <FaCoins className="text-2xl text-yellow-600" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  33%
                </p>
                <p className="text-lg font-semibold text-yellow-600 mb-2">
                  Parents
                </p>
                <p className="text-gray-600">
                  Only a third of parents discuss financial topics with their
                  children on a regular basis.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="p-8 transition-transform hover:scale-105 duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <FaCreditCard className="text-2xl text-purple-600" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  85%
                </p>
                <p className="text-lg font-semibold text-purple-600 mb-2">
                  Parents
                </p>
                <p className="text-gray-600">
                  The vast majority of parents believe personal finance should
                  be taught in schools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section
        id="topics"
        className={`observe-section py-20 transition-all duration-1000 ${
          isVisible.topics
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              Explore Our Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              BudgetIQ Topics
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive learning paths designed to build your financial
              knowledge from the ground up
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Financial Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-3 bg-indigo-600"></div>
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-indigo-50 overflow-hidden group-hover:scale-110 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={finacial_1}
                    alt="Financial Plan"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-indigo-700">
                  Financial Plan
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Set achievable goals, create detailed plans, and start your
                  financial journey with confidence.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 group-hover:shadow-lg">
                    Learn More{" "}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-green-50 overflow-hidden group-hover:scale-110 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={finacial_2}
                    alt="Savings"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-green-600">
                  Savings
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Learn effective saving strategies, build emergency funds, and
                  save for short and long-term goals.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors duration-300 group-hover:shadow-lg">
                    Learn More{" "}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Investing */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-yellow-50 overflow-hidden group-hover:scale-110 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={finacial_3}
                    alt="Investing"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-yellow-600">
                  Investing
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Explore investment options, understand risk and return, and
                  learn how to build a balanced portfolio.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors duration-300 group-hover:shadow-lg">
                    Learn More{" "}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Credit Basics */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-3 bg-purple-500"></div>
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-purple-50 overflow-hidden group-hover:scale-110 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={finacial_4}
                    alt="Credit Basics"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-purple-600">
                  Credit Basics
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Master credit fundamentals, improve your credit score, and
                  learn to use debt responsibly.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors duration-300 group-hover:shadow-lg">
                    Learn More{" "}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full opacity-70"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="italic mb-4">
                "BudgetIQ made financial concepts easy to understand. I've
                already started saving for college and feel more confident about
                money decisions."
              </p>
              <div className="font-semibold">Priya S., 16</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="italic mb-4">
                "The interactive budget tools and investment simulations helped
                me understand concepts I struggled with in school. It's learning
                and fun combined!"
              </p>
              <div className="font-semibold">Rahul K., 18</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="italic mb-4">
                "As a parent, I love that my kids are learning essential life
                skills in an engaging way. BudgetIQ teaches what schools often
                miss about personal finance."
              </p>
              <div className="font-semibold">Anjali P., Parent</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className={`observe-section py-20 transition-all duration-1000 ${
          isVisible.cta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative px-6 py-16 md:p-16 text-center">
              {/* Background Elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 translate-x-1/2 translate-y-1/2"></div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                Ready to become a BudgetIQ?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Join thousands of teens mastering their finances and building a
                secure future. Start your financial journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link
                  to="/signIn"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 bg-indigo-800 bg-opacity-40 text-white font-bold rounded-xl border-2 border-white border-opacity-30 hover:bg-opacity-60 transition-all duration-300"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
