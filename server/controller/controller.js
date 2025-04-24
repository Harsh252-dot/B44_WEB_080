const model = require("../models/model");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Category = require("../models/Category");
const Budget = require("../models/Budget");
const SavingsGoal = require("../models/SavingsGoal");
const RecurringTransaction = require("../models/RecurringTransaction");

// Define your create_Categories function
async function create_Categories(req, res) {
  try {
    // Create a new instance of the Categories model
    const Create = new model.Categories({
      type: "Expense",
      color: "#C43095",
    });

    // Save the new category to the database
    await Create.save();

    // Respond with the newly created category
    return res.json(Create);
  } catch (error) {
    console.error("Error while creating category:", error);
    return res
      .status(400)
      .json({ message: `Error while creating category`, error: error.message });
  }
}

async function get_Categories(req, res) {
  let data = await model.Categories.find({});

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, amount } = req.body;

  try {
    const create = await new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });

    await create.save();

    return res.json(create);
  } catch (error) {
    console.error("Error while creating transaction:", error);
    return res.status(400).json({
      message: `Error while creating transaction`,
      error: error.message,
    });
  }
}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  if (!req.body)
    return res.status(400).json({ message: "Post HTTP Data not Provided" });

  try {
    await model.Transaction.deleteOne(req.body);

    return res.json("Record Deleted...!");
  } catch (error) {
    console.error("Error while deleting Transaction Record:", error);
    return res.status(400).json({
      message: "Error while deleting Transaction Record",
      error: error.message,
    });
  }
}

async function get_Labels(req, res) {
  try {
    const labels = await model.Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },
      {
        $unwind: "$categories_info",
      },
    ]);

    const data = labels.map((v) => ({
      _id: v._id,
      name: v.name,
      type: v.type,
      amount: v.amount,
      color: v.categories_info["color"],
    }));

    return res.json(data);
  } catch (error) {
    console.error("Lookup Collection Error:", error);
    return res
      .status(400)
      .json({ message: "Lookup Collection Error", error: error.message });
  }
}

// --- Income CRUD ---
async function createIncome(req, res) {
  try {
    const income = new Income({ ...req.body, user: req.user.id });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating income", error: err.message });
  }
}

async function getIncomes(req, res) {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching incomes", error: err.message });
  }
}

async function updateIncome(req, res) {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(income);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating income", error: err.message });
  }
}

async function deleteIncome(req, res) {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Income deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting income", error: err.message });
  }
}

// --- Expense CRUD ---
async function createExpense(req, res) {
  try {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating expense", error: err.message });
  }
}

async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching expenses", error: err.message });
  }
}

async function updateExpense(req, res) {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating expense", error: err.message });
  }
}

async function deleteExpense(req, res) {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: err.message });
  }
}

// --- Category CRUD ---
async function createCategory(req, res) {
  try {
    const category = new Category({ ...req.body, user: req.user.id });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating category", error: err.message });
  }
}
async function getCategories(req, res) {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: err.message });
  }
}
async function updateCategory(req, res) {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating category", error: err.message });
  }
}
async function deleteCategory(req, res) {
  try {
    await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: err.message });
  }
}

// --- Budget CRUD ---
async function createBudget(req, res) {
  try {
    const budget = new Budget({ ...req.body, user: req.user.id });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating budget", error: err.message });
  }
}
async function getBudgets(req, res) {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching budgets", error: err.message });
  }
}
async function updateBudget(req, res) {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(budget);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating budget", error: err.message });
  }
}
async function deleteBudget(req, res) {
  try {
    await Budget.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting budget", error: err.message });
  }
}

// --- SavingsGoal CRUD ---
async function createSavingsGoal(req, res) {
  try {
    const goal = new SavingsGoal({ ...req.body, user: req.user.id });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating savings goal", error: err.message });
  }
}
async function getSavingsGoals(req, res) {
  try {
    const goals = await SavingsGoal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching savings goals", error: err.message });
  }
}
async function updateSavingsGoal(req, res) {
  try {
    const goal = await SavingsGoal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating savings goal", error: err.message });
  }
}
async function deleteSavingsGoal(req, res) {
  try {
    await SavingsGoal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Savings goal deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting savings goal", error: err.message });
  }
}

// --- RecurringTransaction CRUD ---
async function createRecurringTransaction(req, res) {
  try {
    const rec = new RecurringTransaction({ ...req.body, user: req.user.id });
    await rec.save();
    res.status(201).json(rec);
  } catch (err) {
    res.status(500).json({
      message: "Error creating recurring transaction",
      error: err.message,
    });
  }
}
async function getRecurringTransactions(req, res) {
  try {
    const recs = await RecurringTransaction.find({ user: req.user.id });
    res.json(recs);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching recurring transactions",
      error: err.message,
    });
  }
}
async function updateRecurringTransaction(req, res) {
  try {
    const rec = await RecurringTransaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(rec);
  } catch (err) {
    res.status(500).json({
      message: "Error updating recurring transaction",
      error: err.message,
    });
  }
}
async function deleteRecurringTransaction(req, res) {
  try {
    await RecurringTransaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Recurring transaction deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting recurring transaction",
      error: err.message,
    });
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  createSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal,
  createRecurringTransaction,
  getRecurringTransactions,
  updateRecurringTransaction,
  deleteRecurringTransaction,
};
