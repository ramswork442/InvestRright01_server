const express = require("express");
const {
  createStockSuggestion,
  getStockSuggestions,
  getStockDateSuggestions
} = require("../controllers/stockSuggestion.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

const router = express.Router();

// Admin-only routes
router.post("/",  verifyToken, allowRoles("admin"), createStockSuggestion);

// Public routes
router.get("/", getStockDateSuggestions);

module.exports = router;
