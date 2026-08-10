const db = require("../config/db");

// GET all books
const getBooks = (req, res) => {
  const sql = "SELECT * FROM books ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve books",
        error: err.message,
      });
    }

    res.json(results);
  });
};

// GET one book
const getBookById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM books WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve book",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(results[0]);
  });
};

// CREATE book
const createBook = (req, res) => {
  const { title, author, category, price } = req.body;

  if (!title || !author || !category || price === undefined) {
    return res.status(400).json({
      message: "Title, author, category, and price are required",
    });
  }

  if (Number(price) <= 0) {
    return res.status(400).json({
      message: "Price must be greater than 0",
    });
  }

  const sql = `
    INSERT INTO books (title, author, category, price)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, author, category, price],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to create book",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Book created successfully",
        bookId: result.insertId,
      });
    }
  );
};

// UPDATE book
const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, category, price } = req.body;

  if (!title || !author || !category || price === undefined) {
    return res.status(400).json({
      message: "Title, author, category, and price are required",
    });
  }

  if (Number(price) <= 0) {
    return res.status(400).json({
      message: "Price must be greater than 0",
    });
  }

  const sql = `
    UPDATE books
    SET title = ?, author = ?, category = ?, price = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, author, category, price, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update book",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      res.json({
        message: "Book updated successfully",
      });
    }
  );
};

// DELETE book
const deleteBook = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM books WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete book",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json({
      message: "Book deleted successfully",
    });
  });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};