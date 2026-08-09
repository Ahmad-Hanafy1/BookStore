import React from "react";

function Features() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Our Features</h1>
        <p className="text-muted">
          Everything you need to discover books.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h3>🔍 Search Books</h3>
              <p className="text-muted">
                Quickly search for books by title or author.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h3>📚 Browse Books</h3>
              <p className="text-muted">
                Explore our collection and discover new books.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h3>🛒 Shopping Cart</h3>
              <p className="text-muted">
                Add your favorite books to a simple shopping cart.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;