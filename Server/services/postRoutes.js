const authMiddleware = require("../middleware/authMiddleware.js");
const postController = require("../controller/postController.js");
const express = require("express");
const router = express.Router();

router.post("/", authMiddleware.checkSession, postController.createPost);
router.get("/feed", authMiddleware.checkSession, postController.postTimeline);
router.post(
  "/remove/:id",
  authMiddleware.checkSession,
  postController.deletePost
);
router.get(
  "/allFeed",
  authMiddleware.checkSession,
  postController.allPostTimeline
);

module.exports = router;
