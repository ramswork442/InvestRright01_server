const express = require("express");
const { createMarketReport, getMarketReports} = require("../controllers/marketReport.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

const router = express.Router();

// Admin-only routes
router.post("/", verifyToken, allowRoles("admin"), createMarketReport);

// Public routes
router.get("/", getMarketReports);

module.exports = router;
