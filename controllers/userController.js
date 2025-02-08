import promisePool from '../db/dbConfig.js'; // Database connection

// Create a new user
export const saveUser = async (req, res) => {
  const { fullName, email, password, userRole } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const query = 'INSERT INTO users (fullName, email, password, userRole) VALUES (?, ?, ?, ?)';
    const values = [fullName, email, password, userRole || 'user'];
    const [result] = await promisePool.execute(query, values);

    res.status(201).json({ message: 'User saved successfully!', userId: result.insertId });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Failed to save user.' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await promisePool.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await promisePool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, userRole } = req.body;

  try {
    const query = 'UPDATE users SET fullName = ?, email = ?, password = ?, userRole = ? WHERE id = ?';
    const values = [fullName, email, password, userRole, id];
    await promisePool.execute(query, values);

    res.json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user.' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await promisePool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};
