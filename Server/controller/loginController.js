const { db } = require("../utils/db.config.js");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], (err, result) => {
    if (err) res.status(500).json({ message: "Error: " + err });
    else if (result.length === 0)
      res.status(500).json({ message: "No user found" });
    else {
      req.session.userInfo = result;
      res.status(200).json({
        userInfo: {
          id: result[0].id,
          username: result[0].username,
          email: result[0].email,
          dp: result[0].dp ? result[0].dp.toString("base64") : "", // Convert binary image data to base64
        },
      });
    }
  });
};

module.exports = { loginUser };
