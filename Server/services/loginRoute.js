const loginController = require("../controller/loginController.js");
const express = require("express");
const router = express.Router();

router.post("/", loginController.loginUser);

module.exports = router;
