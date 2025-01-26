import express from 'express';
import promisePool from '../db/dbConfig.js'; // Assuming dbConfig.js is in the parent directory
import saveUser from '../controllers/userController.js';
import login from '../controllers/loginController.js';
const router = express.Router();

// Route for basic user registration
router.post('/register',saveUser );
router.post('/login',login)

export default router;
