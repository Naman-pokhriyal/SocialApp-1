const { db } = require("../utils/db.config.js");

// POST request to User Changes
function createUser(req, res) {
  const { username, email } = req.body;
  const query = `INSERT INTO users (username, email) VALUES (?, ?)`;

  db.query(query, [username, email], (err, result) => {
    if (err) res.status(500).json({ message: err });
    else res.status(200).json({ message: "User Created Successfully" });
  });
}

function updateUser(req, res) {
  const { username } = req.body;
  let dp = "";
  if (req.file) dp = req.file.buffer;
  const id = req.session.userInfo[0].id;
  const query = `UPDATE users SET username = ?, dp = ? WHERE id = ?`;

  db.query(query, [username, dp, id], (err, result) => {
    if (err) res.status(500).json({ message: err });
    else
      res.status(200).json({ message: "User Created Successfully" + result });
  });
}

// GET request for user post
function getUserProfile(req, res) {
  const user_id = req.session.userInfo[0].id;
  const query = `SELECT * FROM users u 
  LEFT JOIN posts p ON u.id = p.user_id
  WHERE u.id = ? ORDER BY p.created_at DESC`;
  db.query(query, [user_id], (err, result) => {
    if (err) res.status(404).json({ message: "Error " + err });
    else res.status(200).json({ result });
  });
}
// GET request for any USER profile
function getUserData(req, res) {
  const { user_id } = req.params;
  const id = req.session.userInfo[0].id;
  const query = `SELECT u.*, p.*, 
  CASE WHEN f.follower_id IS NULL THEN 0 ELSE 1 END AS is_following
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN follows f ON u.id = f.following_id AND f.follower_id = ?
WHERE u.id = ?
ORDER BY p.created_at DESC`;

  db.query(query, [id, user_id], (err, result) => {
    if (err) res.status(500).json({ message: err });
    if (result.length == 0) res.status(500).json({ message: "No User Found" });
    else res.status(200).json({ result });
  });
}

// POST request to Delete User
function deleteUser(req, res) {
  const user_id = req.body.user_id;
  const query = `DELETE FROM users WHERE user_id = ?`;
  db.query(query, [user_id], (err, result) => {
    if (err) res.status(500).json({ message: "Error " + err });
    else res.status(200).json({ message: "Account Deleted Successfully" });
  });
}

module.exports = {
  createUser,
  updateUser,
  getUserProfile,
  deleteUser,
  getUserData,
};
