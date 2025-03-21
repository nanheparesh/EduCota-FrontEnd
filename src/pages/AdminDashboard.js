import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        // ✅ Use the correct endpoint: /auth/check-admin
        const response = await axios.get("https://edu-cota-back-end.vercel.app/auth/check-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("👀 Admin Status:", response.data);

        if (!response.data.isAdmin) {
          setError("❌ Unauthorized access! Redirecting...");
          navigate("/login", { replace: true });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error verifying admin:", error.message);
        setError("❌ Server Error! Redirecting...");
        navigate("/login", { replace: true });
      }
    };

    fetchAdminStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin"); // Clear admin status
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a spinner or better loading UI
  }

  if (error) {
    return <p>{error}</p>; // Display error message in the UI
  }

  return (
    <div>
      <nav className="admin-navbar">
        <h1 className="admin-title">EduCota</h1>
        <button className="add-course-btn" onClick={() => navigate("/add-course")}>
          Add Course
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="admin-container">
        <h2>Welcome, Admin!</h2>
        {/* Courses will be shown here */}
        {courses.length > 0 ? (
          <ul>
            {courses.map((course) => (
              <li key={course._id}>{course.name}</li>
            ))}
          </ul>
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;