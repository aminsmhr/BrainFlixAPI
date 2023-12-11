const express = require("express");
const router = express.Router();

const { get } = require("../controllers/registerController");
router.route("/").get(get);

module.exports = router;
