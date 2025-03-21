import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./pages/AddCourse";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get values from localStorage on component mount
    const auth = localStorage.getItem("isAuthenticated");
    const admin = localStorage.getItem("isAdmin");
    setIsAuthenticated(auth === "true"); // Convert string to boolean
    setIsAdmin(admin === "true"); // Convert string to boolean
  }, []);

  console.log("🚀 App.js State:", { isAuthenticated, isAdmin }); // Debugging

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/user-dashboard"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-course"
          element={isAdmin ? <AddCourse /> : <Navigate to="/admin-dashboard" />}
        />
      </Routes>
    </Router>
  );
}

export default App;