import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero-section bg-light">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-7">
              <h1 className="display-4 fw-bold">
                Discover Your Next Favorite Book 📚
              </h1>

              <p className="lead mt-3">
                Explore our collection of books and find something
                perfect for your next reading adventure.
              </p>

              <Link
                to="/books"
                className="btn btn-dark btn-lg mt-3"
              >
                Browse Books
              </Link>
            </div>

            <div className="col-md-5 text-center mt-4 mt-md-0">
              <div style={{ fontSize: "150px" }}>
                📚
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="container py-5">

        <div className="text-center mb-5">
          <h2>Why Choose BookStore?</h2>
          <p className="text-muted">
            Everything you need to discover great books.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body p-4">
                <h3>🔍</h3>
                <h5>Easy Search</h5>
                <p className="text-muted">
                  Quickly find books by searching their titles.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body p-4">
                <h3>📚</h3>
                <h5>Great Collection</h5>
                <p className="text-muted">
                  Browse different books and discover new favorites.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body p-4">
                <h3>🛒</h3>
                <h5>Simple Cart</h5>
                <p className="text-muted">
                  Add books to your cart and see your total instantly.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}

export default Home;