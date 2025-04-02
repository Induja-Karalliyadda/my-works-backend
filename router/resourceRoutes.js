import express from "express";
import upload from '../middleware/upload.js';  // Import the file upload middleware
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

        const { course_id, resourceName } = req.body;
        const resourceURL = `/uploads/${req.file.filename}`;

        res.status(201).json({ message: "File uploaded successfully", filePath: resourceURL });
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
