import express from "express";
import { enroll, getUserEnrollments, generateOrderId } from "../controllers/enrollmentsController.js";

const router = express.Router();

router.post("/enroll", enroll);
router.get("/enrolled-courses/:userId", getUserEnrollments); 

export default router;
