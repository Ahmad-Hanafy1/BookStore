import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCart(cart.filter((book) => book.id !== id));
  };

  const total = cart.reduce(
    (sum, book) => sum + Number(book.price) * book.quantity,
    0
  );

  const checkout = async () => {
    setError("");

    // Check if cart is empty
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before checkout.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const items = cart.map((book) => ({
        book_id: book.id,
        quantity: book.quantity,
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");

      // Empty cart after successful order
      setCart([]);

      navigate("/books");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.
        </div>
      ) : (
        <>
          {cart.map((book) => (
            <div
              className="card mb-3"
              key={book.id}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{book.title}</h5>

                  <p className="mb-1">
                    ${book.price} × {book.quantity}
                  </p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(book.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <h4>
              Total: ${total.toFixed(2)}
            </h4>

            <button
              className="btn btn-success mt-2"
              onClick={checkout}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;