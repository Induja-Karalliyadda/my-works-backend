import express from "express";
import { getAllCourses, getCourseById, addCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses", addCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
