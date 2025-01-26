import promisePool from "../db/dbConfig.js"; // Assuming db.js is in the parent directory
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await promisePool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (user.length > 0) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user[0].id, role: user[0].role, email: user[0].email },
        process.env.JWT_SECRET,
        { expiresIn: "30m" } // Token expires in 30 minutes
      );
      const userData = user[0];
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // Prevent access to the cookie via JavaScript
          secure: false, // Set true if using HTTPS
          maxAge: null ,// Ensure the cookie is a session cookie
          sameSite: 'strict', // Prevent CSRF attacks
        })
        .json(user[0]);
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
export default login;
