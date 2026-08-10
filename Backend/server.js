const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "BookStore API is running",
  });
});

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 AS result", (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
    }

    res.json({
      message: "Database connected successfully",
      result: results,
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});