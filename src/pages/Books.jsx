import React, { useState } from "react";
import BookCard from "../components/BookCard";

function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    },
    {
      id: 2,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1511108690759-009324a90311?w=500",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Development",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500",
    },
    {
      id: 5,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Technology",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    },
    {
      id: 6,
      title: "Harry Potter",
      author: "J.K. Rowling",
      category: "Fantasy",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=500",
    },
  ];

  // Get unique categories
  const categories = ["All", ...new Set(books.map((book) => book.category))];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  // Add book to cart
  const addToCart = (book) => {
    const existingBook = cart.find((item) => item.id === book.id);

    if (existingBook) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove book completely
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">

      {/* Page Header */}
      <div className="text-center mb-4">
        <h1>Our Books 📚</h1>
        <p className="text-muted">
          Browse, search, and discover your next favorite book.
        </p>
      </div>

      {/* Search and Category */}
      <div className="row justify-content-center g-3 mb-5">

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Books */}
      <div className="row g-4">

        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <div className="text-center py-5">
            <h4>No books found 📚</h4>
            <p className="text-muted">
              Try another search or category.
            </p>
          </div>
        )}

      </div>

      {/* Shopping Cart */}
      <div className="mt-5">

        <h2 className="mb-4">
          Shopping Cart 🛒
        </h2>

        {cart.length === 0 ? (
          <div className="alert alert-light border">
            Your cart is empty.
          </div>
        ) : (
          <div className="card shadow-sm">

            <div className="card-body">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-bottom py-3"
                >

                  <div className="row align-items-center">

                    {/* Book information */}
                    <div className="col-md-5">
                      <h5 className="mb-1">
                        {item.title}
                      </h5>

                      <small className="text-muted">
                        {item.author}
                      </small>
                    </div>

                    {/* Price */}
                    <div className="col-md-2 mt-2 mt-md-0">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-md-3 mt-2 mt-md-0">

                      <div className="d-flex align-items-center">

                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>

                        <span className="mx-3">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Remove */}
                    <div className="col-md-2 mt-2 mt-md-0 text-md-end">

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

              {/* Total */}
              <div className="text-end mt-4">

                <h4>
                  Total: ${total.toFixed(2)}
                </h4>

                <button className="btn btn-success mt-2">
                  Checkout
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Books;