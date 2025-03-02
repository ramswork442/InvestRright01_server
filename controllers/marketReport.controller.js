const MarketReport = require("../models/marketReport.model");

// Create a new market report
const createMarketReport = async (req, res) => {
  const { date, summary, futureOutlook } = req.body;
  console.log(req.body);
  console.log(req.user);
  

  try {
    const existingReport = await MarketReport.findOne({ date });
    if (existingReport) {
      return res.status(400).json({ message: "Report for this date already exists" });
    }

    const marketReport = new MarketReport({
      date,
      summary,
      futureOutlook,
      createdBy: req.user.userId,
    });

    await marketReport.save();
    res.status(201).json({ message: "Market report created successfully", marketReport });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get market reports (current or historical)
const getMarketReports = async (req, res) => {
  try {
    const reports = await MarketReport.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {createMarketReport, getMarketReports}
