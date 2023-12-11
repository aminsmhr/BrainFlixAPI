const express = require("express");
const router = express.Router();

const {
  get,
  post,
  validator,
  getOne,
  addComment,
  removeComment,
} = require("../controllers/videosController");

// We define paths in this file.
// The 'validator' middleware checks if the request has the required fields for a video.
router.route("/").get(validator, get).post(validator, post);

// Example URL to get a video by ID: http://localhost:8080/videos/5ed2b37f-8fbd-4cf4-b64a-cbaa0cc28b5c
router.route("/:id").get(validator, getOne);
router.route("/:id/comments").post(validator, addComment);
router.route("/:id/comments/:commentId").delete(validator, removeComment);

module.exports = router;
