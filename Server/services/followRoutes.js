const followController = require("../controller/followController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const express = require("express");
const router = express.Router();

router.post(
  "/add/:id",
  authMiddleware.checkSession,
  followController.addFollowing
);
router.post(
  "/remove/:id",
  authMiddleware.checkSession,
  followController.removeFollowing
);

module.exports = router;
