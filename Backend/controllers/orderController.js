const db = require("../config/db");

// CREATE ORDER
const createOrder = (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Order must contain at least one book",
    });
  }

  // Check all items before creating the order
  const bookIds = items.map((item) => item.book_id);

  const placeholders = bookIds.map(() => "?").join(",");

  const sql = `
    SELECT id, price
    FROM books
    WHERE id IN (${placeholders})
  `;

  db.query(sql, bookIds, (err, books) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve books",
        error: err.message,
      });
    }

    if (books.length !== bookIds.length) {
      return res.status(400).json({
        message: "One or more books do not exist",
      });
    }

    let total = 0;

    for (const item of items) {
      const book = books.find(
        (b) => b.id === Number(item.book_id)
      );

      const quantity = Number(item.quantity);

      if (!book || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          message: "Invalid book or quantity",
        });
      }

      total += Number(book.price) * quantity;
    }

    // Create order
    const orderSql = `
      INSERT INTO orders (user_id, total)
      VALUES (?, ?)
    `;

    db.query(
      orderSql,
      [userId, total.toFixed(2)],
      (err, orderResult) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to create order",
            error: err.message,
          });
        }

        const orderId = orderResult.insertId;

        const values = items.map((item) => [
          orderId,
          item.book_id,
          item.quantity,
        ]);

        const itemSql = `
          INSERT INTO order_items
          (order_id, book_id, quantity)
          VALUES ?
        `;

        db.query(itemSql, [values], (err) => {
          if (err) {
            return res.status(500).json({
              message: "Order created but failed to add order items",
              error: err.message,
            });
          }

          res.status(201).json({
            message: "Order created successfully",
            orderId,
            total: total.toFixed(2),
          });
        });
      }
    );
  });
};

// GET ALL ORDERS
const getOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      orders.id,
      orders.total,
      orders.created_at,
      users.name,
      users.email
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE orders.user_id = ?
    ORDER BY orders.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve orders",
        error: err.message,
      });
    }

    res.json(results);
  });
};

// GET ONE ORDER
const getOrderById = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `
    SELECT
      orders.id,
      orders.total,
      orders.created_at,
      users.name,
      users.email
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE orders.id = ?
    AND orders.user_id = ?
  `;

  db.query(sql, [id, userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve order",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(results[0]);
  });
};

// UPDATE ORDER
const updateOrder = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { total } = req.body;

  if (total === undefined || Number(total) <= 0) {
    return res.status(400).json({
      message: "Valid total is required",
    });
  }

  const sql = `
    UPDATE orders
    SET total = ?
    WHERE id = ?
    AND user_id = ?
  `;

  db.query(
    sql,
    [Number(total).toFixed(2), id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update order",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json({
        message: "Order updated successfully",
      });
    }
  );
};

// DELETE ORDER
const deleteOrder = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `
    DELETE FROM orders
    WHERE id = ?
    AND user_id = ?
  `;

  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete order",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  });
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};