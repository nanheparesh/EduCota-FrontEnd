import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import axios from "axios"; 
import "../styles/global.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("Username is required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must have 8+ chars, 1 uppercase, 1 number, 1 special char.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/auth/register", formData);

      alert(response.data.message);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Username" className="input-field" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="input-field" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" className="input-field" />
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default RegistrationForm;
