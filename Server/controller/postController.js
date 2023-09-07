const { db } = require("../utils/db.config.js");

// POST request to create Post
function createPost(req, res) {
  const { content } = req.body;
  const user_id = req.session.userInfo[0].id;
  const query = `INSERT INTO posts (user_id, content) VALUES (?, ?)`;

  db.query(query, [user_id, content], (err, result) => {
    if (err) res.status(500).json({ message: err });
    else res.status(200).json({ message: "Post Created Successfully" });
  });
}
// POST request to Delete a Post
function deletePost(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM posts WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) res.status(500).json({ message: err });
    else res.status(200).json({ message: "Post deleted successfully" });
  });
}

// GET request to fetch timeline for user
function postTimeline(req, res) {
  const user_id = req.session.userInfo[0].id;
  const query = `Select * from posts p 
    JOIN users u ON p.user_id = u.id 
    WHERE p.user_id IN ( SELECT following_id FROM follows WHERE follower_id = ? ) OR p.user_id = ?
    ORDER BY p.created_at DESC`;

  db.query(query, [user_id, user_id], (err, result) => {
    if (err) res.status(404).json({ message: err });
    else res.status(200).json({ result });
  });
}

// GET all posts (to be changed)
function allPostTimeline(req, res) {
  const user_id = req.session.userInfo[0].id;
  const query = `SELECT * FROM users u 
  LEFT JOIN posts p ON u.id = p.user_id
  WHERE p.user_id is not null ORDER BY p.created_at DESC`;

  db.query(query, [user_id], (err, result) => {
    if (err) res.status(404).json({ message: err });
    else res.status(200).json({ result });
  });
}

module.exports = { createPost, deletePost, postTimeline, allPostTimeline };
