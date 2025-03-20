import React, { useState, useEffect } from "react";
import "../styles/UserDashboard.css"; 

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);

    // Retrieve logged-in user details from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.username) {
      setUsername(loggedInUser.username); // Set username if available
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove session
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="user-dashboard">
      <header className="user-header">
        <h1>EduCota</h1>
        <nav>
          <span>Welcome, {username ? username : "User"}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <h2 className="h2">Available Courses</h2>

      <div className="courses-container">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p className="course-price">Price: ${course.price}</p>
              <button className="enroll-btn">Enroll</button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
