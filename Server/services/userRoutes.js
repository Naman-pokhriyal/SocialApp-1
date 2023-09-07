const authMiddleware = require("../middleware/authMiddleware.js");
const userController = require("../controller/userController.js");
const { upload } = require("../utils/db.config.js");
const express = require("express");
const router = express.Router();

router.post("/", userController.createUser);
router.post(
  "/update",
  authMiddleware.checkSession,
  upload.single("dp"),
  userController.updateUser
);
router.get(
  "/profile",
  authMiddleware.checkSession,
  userController.getUserProfile
);
router.post("/remove", authMiddleware.checkSession, userController.deleteUser);

// Other Users
router.get(
  "/:user_id",
  authMiddleware.checkSession,
  userController.getUserData
);

module.exports = router;
