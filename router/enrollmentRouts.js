import express from "express";
import { enroll, getUserEnrollments, generateOrderId,getAllEnrollments } from "../controllers/enrollmentsController.js";

const router = express.Router();

router.post("/enroll", enroll);
router.get("/enrolled-courses/:userId", getUserEnrollments); 
router.get("/enrolled-courses", getAllEnrollments);
export default router;
