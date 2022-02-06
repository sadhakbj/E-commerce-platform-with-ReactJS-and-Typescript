import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RootState } from "../../store/reducers"
import Navbar from "../../layouts/Navbar"
import About from "../../pages/About"
import Login from "../../pages/auth/Login"
import Home from "../../pages/Home"
import Details from "../../pages/products/Details"
import Products from "../../pages/products/Index"

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
}
const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Details />} />
        </Route>

        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
