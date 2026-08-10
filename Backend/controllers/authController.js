const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if email already exists
    const checkSql = "SELECT id FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Email is already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(
        insertSql,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Failed to create user",
              error: err.message,
            });
          }

          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

module.exports = {
  signup,
  login,
};