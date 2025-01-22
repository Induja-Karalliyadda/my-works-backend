import promisePool from '../db/dbConfig.js'; // Assuming db.js is in the parent directory

const saveUser = async (req, res) => {
  const { fullName, email, password, userRole } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const query = 'INSERT INTO users (fullName, email, password, userRole) VALUES (?, ?, ?, ?)';
    const values = [fullName, email, password, userRole || 'user']; // Default to 'user' if not provided
    const [result] = await promisePool.execute(query, values);  // Correctly using execute method for queries

    res.status(201).json({
      message: 'User saved successfully!',
      userId: result.insertId,
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Failed to save user.' });
  }
};

export default saveUser;
