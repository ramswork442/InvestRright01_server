const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // console.log(user);

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send both user and accessToken in the response
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  console.log("logout");

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: "No refresh token found. User is not logged in." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { register, login, logout, refresh, getMe };
