const mysql = require("mysql2");
const multer = require("multer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "social-media",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { db, upload };
