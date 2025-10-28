import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashborad";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyIdentityVote from "./pages/VerifyIdentityVote";
import AdminAddPartyCandidate from "./pages/AdminAddPartyCandidate";
import AdminPanel from "./pages/AdminPanel";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminAuthenticated(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />

        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

     
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute>
                <VerifyIdentityVote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AdminAddPartyCandidate />
              </ProtectedRoute>
            }
          />

        
          <Route
            path="/admin"
            element={
              isAdminAuthenticated ? (
                <AdminPanel />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/adminlogin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
