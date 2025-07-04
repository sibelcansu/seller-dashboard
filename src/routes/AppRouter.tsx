//rafce
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../features/auth/Login";
import SingUp from "../features/auth/SingUp";
import Dashboard from "../features/dashboard/Dashboard";
import Products from "../features/products/Products";
import ProtectedRoute from "../components/ProtectedRoute";
import AddProduct from "../features/products/AddProduct";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
