import  React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Components

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages

import NotificationsPage from "./pages/NotificationsPage"; 


export default function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar />}
        <div className="app-body">
          {isAuthenticated && <Sidebar />}
          <div className="main-content">
            <Routes>

              <Route
                path="/notifications"
                element={
                   isAuthenticated={isAuthenticated}>
                    <NotificationsPage />
                
                }
              />
              

              <Route
                path="/notifications"
                element={
                  isAuthenticated ? <NotificationsPage /> : <Navigate to="/NotificationsPage" replace />
                }
              />

              <Route
                path="/Navbar"
                element={
                  isAuthenticated ? <Navbar /> : <Navigate to="/Navbar" replace />
                }
              />

              <Route
                path="/Navbar"
                element={
                  isAuthenticated ? <Sidebar /> : <Navigate to="/Sidebar" replace />
                }
              />

              {/* Catch-all */}
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}



