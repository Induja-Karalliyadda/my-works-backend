import { Router } from 'express';
import  saveUser  from '../controllers/userController.js';

const router = Router();

// Route to save user data
router.post('/save-user', saveUser);

export default router;
