import React from "react";

function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>About BookStore</h1>
        <p className="text-muted">
          Learn more about our online bookstore.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            BookStore is a simple online bookstore designed to help users
            discover and browse books easily.
          </p>

          <p>
            Our goal is to provide a simple and user-friendly experience
            where visitors can search for books and find information about
            their favorite titles.
          </p>

          <p>
            Whether you enjoy fiction, technology, history, or other types
            of books, BookStore makes discovering your next book easy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;