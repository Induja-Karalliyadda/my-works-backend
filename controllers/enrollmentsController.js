import db from "../db/dbConfig.js";

// Function to generate an Order ID
export const generateOrderId = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS count FROM enrollments");
  const count = rows[0].count + 1;
  return `ORD${count.toString().padStart(4, "0")}`;
};

// Enroll a user in a course
export const enroll = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "User ID and Course ID are required" });
    }

    // Check if user is already enrolled
    const [existing] = await db.query(
      "SELECT * FROM enrollments WHERE userId = ? AND courseId = ?",
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const orderId = await generateOrderId();
    const enrollDate = new Date();

    await db.query(
      "INSERT INTO enrollments (orderId, userId, courseId, enrollDate, status) VALUES (?, ?, ?, ?, 'Pending')",
      [orderId, userId, courseId, enrollDate]
    );

    res.status(201).json({ message: "Enrollment successful", orderId });
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get enrolled courses for a user
export const getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query("SELECT * FROM enrollments WHERE userId = ?", [userId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: error.message });
  }
};
// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM  enrollments");
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching all enrollments:", error);
    res.status(500).json({ error: error.message });
  }
};
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update enrollment status in the database
    const [result] = await db.query("UPDATE enrollments SET status = ? WHERE id = ?", [status, id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Enrollment status updated successfully" });
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    res.status(500).json({ error: error.message });
  }
};
