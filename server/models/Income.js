const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String },
  isRecurring: { type: Boolean, default: false },
});

module.exports = mongoose.model("Income", IncomeSchema);
