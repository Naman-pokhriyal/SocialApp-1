const { db } = require("../utils/db.config.js");

function addFollowing(req, res) {
  const follower_id = req.session.userInfo[0].id,
    following_id = req.params.id;
  const query = `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`;

  db.query(query, [follower_id, following_id], (err, result) => {
    if (err) return res.status(err).json({ message: err });
    res.status(200).json({ message: result });
  });
}
function removeFollowing(req, res) {
  const follower_id = req.session.userInfo[0].id,
    following_id = req.params.id;
  const query = `DELETE FROM follows WHERE follower_id = ? AND following_id = ?`;

  db.query(query, [follower_id, following_id], (err, result) => {
    if (err) return res.status(err).json({ message: err });
    res.status(200).json({ message: result });
  });
}

module.exports = { addFollowing, removeFollowing };
