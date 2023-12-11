const express = require("express");
const router = express.Router();

const { get } = require("../controllers/registerController");

// We define paths in this file.
// The 'validator' middleware checks if the request has the required fields for a video.
router.route("/").get(get);

module.exports = router;
