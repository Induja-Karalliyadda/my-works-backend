import express from "express";
import upload from '../middleware/upload.js';  // Import the file upload middleware
import db from "../db/dbConfig.js";
import { 
  getAllResources, 
  getResourceById, 
  createResource, 
  updateResource, 
  deleteResource 
} from "../controllers/resourcesController.js";

const router = express.Router();

router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { courseId, resourceName } = req.body;
        const resourceURL = `/uploads/${req.file.filename}`;

        // Save the resource to the database using async/await
        const sql = "INSERT INTO resources (course_id, resourceName, resourceURL) VALUES (?, ?, ?)";
        try {
            const [result] = await db.execute(sql, [courseId, resourceName, resourceURL]);

            console.log("File uploaded and resource saved:", req.file); 
            res.status(201).json({ message: "File uploaded and resource saved", filePath: resourceURL, result });
        } catch (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ error: err.message });
        }

    } catch (error) {
        console.error("File upload error:", error);
        res.status(500).json({ message: "Error uploading file", error: error.message });
    }
});




router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
