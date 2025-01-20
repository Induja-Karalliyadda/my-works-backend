import dotenv from 'dotenv';
import { createPool } from 'mysql2';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool using environment variables
const pool = createPool({
  host: process.env.DB_HOST,      // Your database host from .env
  user: process.env.DB_USER,      // Your database username from .env
  password: process.env.DB_PASSWORD, // Your database password from .env
  database: process.env.DB_NAME   // Your database name from .env
});

// Export a promise-based pool
const promisePool = pool.promise();

export default promisePool;
