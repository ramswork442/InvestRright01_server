const mongoose = require("mongoose");

const StockSuggestionSchema = new mongoose.Schema(
  {
    stockName: { type: String, required: true },
    direction: { type: String, enum: ["buy", "sell", "hold"], required: true },
    suggestedPriceRange: { type: String, required: true },
    rationale: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockSuggestion", StockSuggestionSchema);
