import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import NotificationsPage from "./pages/NotificationsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
// Uncomment this once Beatrice merges the Login page
// import Login from "./pages/Login";

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        {/* Show Navbar only when logged in */}
        {isAuthenticated && <Navbar />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          {/* Temporary Login placeholder */}
          <Route
            path="/login"
            element={
              <div style={{ padding: "2rem" }}>
                <h2>Login Page Coming Soon</h2>
                <button onClick={() => setIsAuthenticated(true)}>Mock Login</button>
              </div>
            }
          />

          {/* Protected Notifications route */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
