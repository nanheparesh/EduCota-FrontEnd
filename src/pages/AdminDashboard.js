import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
    console.log("📌 Checking access:", { isAuthenticated, isAdmin }); // Debugging
  
    if (!isAuthenticated || !isAdmin) {
      alert("❌ Access Denied! Redirecting to login...");
      navigate("/login", { replace: true }); // ✅ Prevents infinite redirect loop
      return;
    }
  
     // ✅ Fetch courses when component mounts
     fetchCourses();
    }, [navigate]);
  
    // ✅ Fetch courses dynamically whenever localStorage updates
    const fetchCourses = () => {
      const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
      setCourses(storedCourses);
    };
  
    const handleLogout = () => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    };
  
    const handleDelete = (index) => {
      const updatedCourses = courses.filter((_, i) => i !== index);
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses)); // ✅ Update localStorage
    };  

  const handleEdit = (index) => {
    const updatedCourses = [...courses];

    const newTitle = prompt("Enter new title:", updatedCourses[index]?.title);
    const newDescription = prompt("Enter new description:", updatedCourses[index]?.description);
    const newPrice = prompt("Enter new price:", updatedCourses[index]?.price);

    if (newTitle && newDescription && newPrice) {
      updatedCourses[index] = {
        title: newTitle,
        description: newDescription,
        price: newPrice,
      };
      setCourses(updatedCourses);
    }
  };

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

        <div className="courses-container">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p className="course-price">Price: ${course.price}</p>

                <div className="course-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-courses">No courses available. Add some courses!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
