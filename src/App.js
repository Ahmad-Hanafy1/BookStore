import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/books"
          element={
            <Books cart={cart} setCart={setCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} />
          }
        />

        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;