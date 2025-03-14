import db from "../db/dbConfig.js";
// 📌 Get all courses (with optional date filtering)
export const getAllCourses = async (req, res) => {
  try {
      let query = "SELECT * FROM courses";
      let params = [];

      if (req.query.startDate && req.query.endDate) {
          query += " WHERE startDate >= ? AND endDate <= ?";
          params.push(req.query.startDate, req.query.endDate);
      }

      const [courses] = await db.query(query, params);

      if (!courses || courses.length === 0) {
          return res.status(404).json({ message: "No courses found" });
      }

      res.status(200).json(courses);
  } catch (err) {
      console.error("Error fetching courses:", err.message);
      res.status(500).json({ error: err.message });
  }
};
  

// 📌 Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const [course] = await db.query("SELECT * FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    if (course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Add a new course
export const addCourse = async (req, res) => {
  try {
      const { courseId, courseName, lecturer, duration, startDate, endDate, status, coursePrice } = req.body;
      
      await db.query(
          "INSERT INTO courses (courseId, courseName, lecturer, duration, startDate, endDate, status, coursePrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [courseId, courseName, lecturer, duration, startDate, endDate, status, coursePrice]
      );

      res.status(201).json({ message: "Course added successfully!" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// 📌 Update a course
export const updateCourse = async (req, res) => {
  try {
      const { courseName, lecturer, duration, startDate, endDate, status, coursePrice } = req.body;
      
      await db.query(
          "UPDATE courses SET courseName=?, lecturer=?, duration=?, startDate=?, endDate=?, status=?, coursePrice=? WHERE id=?",
          [courseName, lecturer, duration, startDate, endDate, status, coursePrice, req.params.id]
      );

      res.json({ message: "Course updated successfully!" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


// 📌 Delete a course
export const deleteCourse = async (req, res) => {
  try {
      await db.query("DELETE FROM courses WHERE id = ?", [req.params.id]);
      res.json({ message: "Course deleted successfully!" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
