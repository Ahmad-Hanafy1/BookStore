const db = require("../config/db");

const createMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email, and message are required",
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }

  if (message.trim().length < 5) {
    return res.status(400).json({
      message: "Message must be at least 5 characters",
    });
  }

  const sql = `
    INSERT INTO contact_messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name.trim(), email.trim(), message.trim()],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to send message",
        });
      }

      res.status(201).json({
        message: "Message sent successfully",
        messageId: result.insertId,
      });
    }
  );
};

const getMessages = (req, res) => {
  const sql = `
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to retrieve messages",
      });
    }

    res.json(results);
  });
};

module.exports = {
  createMessage,
  getMessages,
};