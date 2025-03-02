const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  activePlan: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
