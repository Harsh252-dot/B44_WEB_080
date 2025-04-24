const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavingsGoalSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavingsGoal", SavingsGoalSchema);
