import { createPool } from 'mysql2';

// Create a connection pool
const pool = createPool({
  host: 'localhost',        // Your database host
  user: 'root',             // Your database username
  password: '1234', // Your database password
  database: 'myworks', // Your database name
});

// Export a promise-based pool
const promisePool = pool.promise();

export default promisePool;
