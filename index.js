import express from 'express';
import cors from 'cors';
import userRoutes from './router/userRoutes.js';
import courseRoute from './router/courseRoutes.js';
import enrollmentRoutes from "./router/enrollmentRouts.js";
import emailRouter from './router/emailRouter.js';
import resourceRoutes from './router/resourceRoutes.js'
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();
const PORT = 5000;

// CORS Options
const corsOptions = {
  origin: 'http://localhost:5173', // Ensure this is correct
  credentials: true, // Allow cookies
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json()); // ✅ Correct way to parse JSON
// Serve static files from the absolute path
const uploadDir = path.resolve('./uploads');
app.use('/uploads', express.static(uploadDir));



// Routes
app.use('/api', userRoutes);
app.use('/api', courseRoute);
app.use("/api", enrollmentRoutes);
app.use("/api",emailRouter)
app.use("/api", resourceRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
