const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecurringTransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  description: { type: String },
  frequency: {
    type: String,
    enum: ["weekly", "monthly", "annually"],
    required: true,
  },
  nextDate: { type: Date, required: true },
  lastProcessed: { type: Date },
});

module.exports = mongoose.model(
  "RecurringTransaction",
  RecurringTransactionSchema
);
