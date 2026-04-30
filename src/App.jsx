import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CreateVoucher from "./pages/CreateVoucher";
import VoucherList from "./pages/VoucherList";
import EditVoucher from "./pages/EditVoucher";

// Simple Protected Route
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Create Voucher */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateVoucher />
            </ProtectedRoute>
          }
        />

        {/* Voucher List */}
        <Route
          path="/vouchers"
          element={
            <ProtectedRoute>
              <VoucherList />
            </ProtectedRoute>
          }
        />

        {/* Edit Voucher */}
        <Route
          path="/edit/:index"
          element={
            <ProtectedRoute>
              <EditVoucher />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;