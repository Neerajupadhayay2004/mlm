import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// User Components
import UserLayout from "./components/layout/UserLayout";
import Dashboard from "./components/user/Dashboard";
import Downline from "./components/user/Downline";
import Earnings from "./components/user/Earnings";
import Withdrawals from "./components/user/Withdrawals";
import Referrals from "./components/user/Referrals";
import Profile from "./components/user/Profile";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <div className="text-white text-xl font-bold">MLM</div>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <div className="text-white text-xl font-bold">MLM</div>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* User Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="downline" element={<Downline />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="withdrawals" element={<Withdrawals />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;
