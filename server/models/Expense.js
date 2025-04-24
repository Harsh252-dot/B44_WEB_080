const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  isRecurring: { type: Boolean, default: false },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
