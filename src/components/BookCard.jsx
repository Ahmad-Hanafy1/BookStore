import React from "react";

function BookCard({ book, onAddToCart }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div className="card h-100 shadow-sm book-card">

        <img
          src={book.image}
          className="card-img-top book-image"
          alt={book.title}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {book.title}
          </h5>

          <p className="text-muted mb-1">
            By {book.author}
          </p>

          <p className="small text-secondary">
            {book.category}
          </p>

          <p className="fw-bold mt-auto">
            ${book.price.toFixed(2)}
          </p>

          <button
            className="btn btn-dark w-100"
            onClick={() => onAddToCart(book)}
          >
            Add to Cart 🛒
          </button>

        </div>

      </div>
    </div>
  );
}

export default BookCard;