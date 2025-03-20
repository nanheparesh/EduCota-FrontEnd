import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./pages/AddCourse"; // Import New Page

function App() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated") || "false");

  console.log("🚀 App.js State:", { isAuthenticated, isAdmin }); // Debugging

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/add-course" element={isAdmin ? <AddCourse /> : <Navigate to="/admin-dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
