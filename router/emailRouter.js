import { Router } from "express";
import { sendMailforCourse } from "../controllers/emailController.js";
const emailRouter = Router();
emailRouter.post('/email',sendMailforCourse);






export default emailRouter;