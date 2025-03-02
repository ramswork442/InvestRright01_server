const mongoose = require("mongoose");

const MarketReportSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, unique: true }, // Report date
    summary: { type: String, required: true }, // Market summary for the day
    futureOutlook: { type: String, required: true }, // Future outlook of the market
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketReport", MarketReportSchema);
