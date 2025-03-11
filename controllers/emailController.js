import { sendReminderEmail } from "../config/send-email.js";

export const sendMailforCourse = async (req, res, next) => {
    try {
        const { userEmail, courseName, lecturer, orderId } = req.body;

        // Validate required parameters
        if (!userEmail || !courseName || !lecturer || !orderId) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        await sendReminderEmail({ userEmail, courseName, lecturer, orderId });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email", error: error.message });
    }
};
