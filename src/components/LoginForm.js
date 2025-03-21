import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [loginSuccess, setLoginSuccess] = useState(false); // Success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const { email, password } = formData;
  
    try {
      const response = await axios.post("/auth/login", { email, password });
  
      console.log("✅ Login Response:", response.data);
  
      // Store token and isAdmin in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAdmin", response.data.isAdmin);
  
      // Verify admin status
      await checkAdminStatus();
  
      // Redirect based on role
      if (response.data.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.message || error.message);
      alert("Login failed! Check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkAdminStatus = async () => {
    try {
      const response = await axios.get("/auth/check-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Admin status:", response.data.isAdmin);
    } catch (error) {
      console.error("❌ Error verifying admin:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {loginSuccess && (
        <p className="success-message">✅ Login successful! Redirecting...</p>
      )}
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginForm;