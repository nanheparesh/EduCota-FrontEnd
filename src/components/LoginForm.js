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
    setIsLoading(true); // Start loading
    setLoginSuccess(false); // Reset success state

    const { email, password } = formData;

    try {
      const response = await axios.post(
        "https://edu-cota-back-end.vercel.app/auth/login",
        { email, password }
      );

      console.log("✅ Login Response:", response.data);

      // Store token, isAuthenticated, and isAdmin in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAuthenticated", "true"); // Update isAuthenticated
      localStorage.setItem("isAdmin", response.data.isAdmin.toString()); // Update isAdmin

      // Show success message
      setLoginSuccess(true);

      // Redirect after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate(response.data.isAdmin ? "/admin-dashboard" : "/user-dashboard");
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.message || error.message);
      alert("Login failed! Check your email and password.");
    } finally {
      setIsLoading(false); // Stop loading
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