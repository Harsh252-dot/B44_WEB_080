const routes = require("express").Router();

const ensureAuthenticated = require("../Middlewares/Auth");
const controller = require("../controller/controller");
const {
  createTransactionValidation,
  createCategoryValidation,
} = require("../Middlewares/AuthValidation");

routes
  .route("/api/categories")
  .post(createCategoryValidation, controller.create_Categories)
  .get(controller.get_Categories);

routes
  .route("/api/transaction")
  .post(createTransactionValidation, controller.create_Transaction)
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction);

routes.route("/api/labels").get(controller.get_Labels);

// Income routes
routes.post("/api/income", ensureAuthenticated, controller.createIncome);
routes.get("/api/income", ensureAuthenticated, controller.getIncomes);
routes.put("/api/income/:id", ensureAuthenticated, controller.updateIncome);
routes.delete("/api/income/:id", ensureAuthenticated, controller.deleteIncome);

// Expense routes
routes.post("/api/expense", ensureAuthenticated, controller.createExpense);
routes.get("/api/expense", ensureAuthenticated, controller.getExpenses);
routes.put("/api/expense/:id", ensureAuthenticated, controller.updateExpense);
routes.delete(
  "/api/expense/:id",
  ensureAuthenticated,
  controller.deleteExpense
);

// Category routes
routes.post("/api/category", ensureAuthenticated, controller.createCategory);
routes.get("/api/category", ensureAuthenticated, controller.getCategories);
routes.put("/api/category/:id", ensureAuthenticated, controller.updateCategory);
routes.delete(
  "/api/category/:id",
  ensureAuthenticated,
  controller.deleteCategory
);

// Budget routes
routes.post("/api/budget", ensureAuthenticated, controller.createBudget);
routes.get("/api/budget", ensureAuthenticated, controller.getBudgets);
routes.put("/api/budget/:id", ensureAuthenticated, controller.updateBudget);
routes.delete("/api/budget/:id", ensureAuthenticated, controller.deleteBudget);

// SavingsGoal routes
routes.post(
  "/api/savings-goal",
  ensureAuthenticated,
  controller.createSavingsGoal
);
routes.get(
  "/api/savings-goal",
  ensureAuthenticated,
  controller.getSavingsGoals
);
routes.put(
  "/api/savings-goal/:id",
  ensureAuthenticated,
  controller.updateSavingsGoal
);
routes.delete(
  "/api/savings-goal/:id",
  ensureAuthenticated,
  controller.deleteSavingsGoal
);

// RecurringTransaction routes
routes.post(
  "/api/recurring",
  ensureAuthenticated,
  controller.createRecurringTransaction
);
routes.get(
  "/api/recurring",
  ensureAuthenticated,
  controller.getRecurringTransactions
);
routes.put(
  "/api/recurring/:id",
  ensureAuthenticated,
  controller.updateRecurringTransaction
);
routes.delete(
  "/api/recurring/:id",
  ensureAuthenticated,
  controller.deleteRecurringTransaction
);

module.exports = routes;
