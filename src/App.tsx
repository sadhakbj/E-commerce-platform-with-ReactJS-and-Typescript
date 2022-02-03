import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./layouts/Navbar"
import About from "./pages/About"
import Login from "./pages/auth/Login"
// pages
import Home from "./pages/Home"
import Details from "./pages/products/Details"
import Products from "./pages/products/Index"

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
