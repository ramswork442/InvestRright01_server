const Event = require("../models/event.model");

// Admin creates an event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.userId,
    });
    await event.save();
    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get all events (for users to view upcoming events)
exports.getAllEvents = async (req, res) => {
  try {
    // Sort events by date ascending so the next upcoming events are first
    const events = await Event.find().sort({ date: 1 });
    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
