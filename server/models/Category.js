const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  color: { type: String, default: "#FCBE44" },
});

module.exports = mongoose.model("Category", CategorySchema);
