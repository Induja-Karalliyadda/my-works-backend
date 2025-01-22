import express from 'express';
import cors from 'cors';
import userRoutes from './router/userRoutes.js';
import { json } from 'express';

const app = express();
const PORT = 5000;

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
