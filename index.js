import express from 'express';
import cors from 'cors';
import userRoutes from './router/userRoutes.js';
import { json } from 'express';

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies
};


app.use(cors(corsOptions))
// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(json());

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
