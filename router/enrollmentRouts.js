import express from "express";
import { enroll, getUserEnrollments, generateOrderId,getAllEnrollments, updateEnrollmentStatus } from "../controllers/enrollmentsController.js";

const router = express.Router();

router.post("/enroll", enroll);
router.get("/enrolled-courses/:userId", getUserEnrollments); 
router.get("/enrolled-courses", getAllEnrollments);
router.put("/enrolled-courses/:id", updateEnrollmentStatus);

export default router;
