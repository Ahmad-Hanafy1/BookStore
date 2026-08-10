import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(false);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setSubmitted(true);

      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to send message."
      );
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div className="text-center mb-5">
        <h1>Contact Us</h1>

        <p className="text-muted">
          Have a question? Send us a message.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-7">

          {/* Success message */}
          {submitted && (
            <div className="alert alert-success">
              Message sent successfully!
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Message
              </label>

              <textarea
                name="message"
                className="form-control"
                rows="5"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-dark"
            >
              Send Message
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Contact;