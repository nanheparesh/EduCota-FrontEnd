import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddCourse.css";

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!course.title || !course.description || !course.price) {
      alert("All fields are required!");
      return;
    }
  
    // Save to localStorage
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  
    alert("Course added successfully!");
  
    // ✅ Force update by reloading the page
    navigate("/admin-dashboard", { replace: true });
    window.location.reload();
  };  

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
  
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
          placeholder="Course Title"
        />

        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          required
          placeholder="Course Description"
        ></textarea>

        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleChange}
          required
          placeholder="Course Price ($)"
        />

        <button type="submit">Add Course</button>
      </form>

      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default AddCourse;
