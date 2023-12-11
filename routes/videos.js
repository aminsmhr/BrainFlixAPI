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

router.route("/").get(validator, get).post(validator, post);

router.route("/:id").get(validator, getOne);
router.route("/:id/comments").post(validator, addComment);
router.route("/:id/comments/:commentId").delete(validator, removeComment);

module.exports = router;
