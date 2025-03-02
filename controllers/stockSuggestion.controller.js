const StockSuggestion = require("../models/stockSuggestion.model");

// Create a stock suggestion
const createStockSuggestion = async (req, res) => {
  const { stockName, direction, suggestedPriceRange, rationale } = req.body;
  console.log(req.body);
  console.log(req.user);
  
  try {
    const stockSuggestion = new StockSuggestion({
      stockName,
      direction,
      suggestedPriceRange,
      rationale,
      createdBy: req.user.userId,
    });

    await stockSuggestion.save();
    res.status(201).json({
      message: "Stock suggestion created successfully",
      stockSuggestion,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get stock suggestions for a specific date
const getStockSuggestions = async (req, res) => {
  const { date } = req.query;

  try {
    const suggestions = await StockSuggestion.find({ date }).sort({ stockName: 1 }); // Sort alphabetically
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getStockDateSuggestions = async (req, res) => {
  const { date } = req.query; // Expecting a single date in the query
  // console.log(date);
  
  try {
    const filter = {};

    if (date) {
      const targetDate = new Date(date);
      // Filter for the specific date by matching the day, month, and year
      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      filter.createdAt = {
        $gte: targetDate, // Start of the day
        $lt: nextDay, // Start of the next day
      };
    }

    const suggestions = await StockSuggestion.find(filter)
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate("createdBy", "name email"); // Populate admin info

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {createStockSuggestion, getStockSuggestions, getStockDateSuggestions}
