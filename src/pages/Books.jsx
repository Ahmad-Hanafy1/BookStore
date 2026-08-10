import React, { useEffect, useState } from "react";
import axios from "axios";

function Books({ cart, setCart }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load books.");
        setLoading(false);
      });
  }, []);

  const addToCart = (book) => {
    const existingBook = cart.find(
      (item) => item.id === book.id
    );

    if (existingBook) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...book,
          quantity: 1,
        },
      ]);
    }

    alert(`${book.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading books...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Our Books
      </h1>

      <div className="row">
        {books.map((book) => (
          <div
            className="col-md-4 mb-4"
            key={book.id}
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {book.title}
                </h5>

                <p className="card-text">
                  <strong>Author:</strong>{" "}
                  {book.author}
                </p>

                <p className="card-text">
                  <strong>Category:</strong>{" "}
                  {book.category}
                </p>

                <p className="card-text">
                  <strong>Price:</strong> $
                  {book.price}
                </p>

                <button
                  className="btn btn-dark"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;