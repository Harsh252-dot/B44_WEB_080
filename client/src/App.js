import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Graph from "./components/Graph";
import Form from "./components/Form";
import Home from "./components/home";
import Navbar from "./components/Navbar";
import ExpenseTrack from "./components/ExpenseTrack";
import GameHome from "./components/GameHome";
import ChooseModule from "./components/ChooseModule";
import LeaderBoard from "./components/LeaderBoard";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import StoryLine from "./components/StoryLine";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BudgetManager from "./components/BudgetManager";
import SavingsGoalManager from "./components/SavingsGoalManager";
import CategoryManager from "./components/CategoryManager";
import RecurringTransactionManager from "./components/RecurringTransactionManager";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/expenseTrack"
            element={
              <ProtectedRoute>
                <ExpenseTrack />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/storyLine"
            element={
              <ProtectedRoute>
                <StoryLine />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <BudgetManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings-goals"
            element={
              <ProtectedRoute>
                <SavingsGoalManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoryManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recurring"
            element={
              <ProtectedRoute>
                <RecurringTransactionManager />
              </ProtectedRoute>
            }
          />
          <Route path="/leaderBoard" element={<LeaderBoard />} />
          <Route path="/chooseModule" element={<ChooseModule />} />
          <Route path="/gameHome" element={<GameHome />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
