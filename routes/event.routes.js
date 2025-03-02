const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../controllers/event.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// Route for admin to create an event
router.post("/", verifyToken, allowRoles("admin"), createEvent);

// Public route for all users to get events
router.get("/", getAllEvents);

module.exports = router;
