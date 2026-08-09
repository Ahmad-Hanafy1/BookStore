import React from "react";

function Contact() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1>Contact Us</h1>
        <p className="text-muted">
          Have a question? Send us a message.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-7">

          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Write your message"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-dark">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Contact;