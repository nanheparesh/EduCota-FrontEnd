import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Place `handleChange` function here, before `return`
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "https://edu-cota-back-end.vercel.app/login",
        { email, password }
      );
  
      console.log("✅ Login Response:", response.data);
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      navigate(response.data.isAdmin ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.message || error.message);
      alert("Login failed! Check your email and password.");
    }
  };
  
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="input-field" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" className="input-field" />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}

export default LoginForm;
