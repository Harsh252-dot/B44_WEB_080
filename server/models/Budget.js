const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g. '2025-04'
});

module.exports = mongoose.model("Budget", BudgetSchema);
