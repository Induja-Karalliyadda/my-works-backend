import db from "../db/dbConfig.js";

// Function to generate an Order ID

export const generateOrderId = async () => {   const [rows] = await db.query("SELECT COUNT(*) AS count FROM enrollments");
    const count = rows[0].count + 1;
    return `ORD${count.toString().padStart(4, "0")}`;};

// Enroll a user in a course
export const enroll = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }

        const orderId = await generateOrderId();
        const enrollDate = new Date();

        const query = `
            INSERT INTO enrollments (orderId, userId, courseId, enrollDate, status) 
            VALUES (?, ?, ?, ?, 'Pending')
        `;

        await db.query(query, [orderId, userId, courseId, enrollDate]);

        res.status(201).json({ message: "Enrollment successful", orderId });
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM enrollments");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ error: error.message });
    }
};
