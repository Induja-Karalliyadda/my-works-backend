import express from "express";
import { enroll, getEnrollments, generateOrderId  } from "../controllers/enrollmentsController.js";

const router = express.Router();

router.post("/enroll", enroll);
router.get("/orderId", generateOrderId); // Endpoint to generate order ID
router.get("/enrollments", getEnrollments); // Endpoint to get all enrollments



export default router;
