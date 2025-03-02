const cookieParser = require('cookie-parser');
const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// imports --
const connectDB = require("./config/connectDB");

// routes --
const authRoutes = require("./routes/auth.routes");
const marketReportRoutes = require("./routes/marketReport.routes");
const stockSuggestionRoutes = require("./routes/stockSuggestion.routes");
const eventRoutes = require("./routes/event.routes");
const courseRoutes = require('./routes/course.routes');

//.env conn --
dotenv.config();

const app = express();

// Middlewares --
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());  //for getting cookie data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/market-reports", marketReportRoutes);
app.use("/api/stock-suggestions", stockSuggestionRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(colors.bgBlue(`Server running on port ${PORT}`)));
});