const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String, // e.g., "₹4,999"
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  instructor: {
    type: String,
    default: "Unknown",
  },
  // You can add additional fields if needed, e.g. duration, level, etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model('Course', courseSchema);

