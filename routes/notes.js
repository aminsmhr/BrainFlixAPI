const express = require("express");
const router = express.Router();

const { get, post, validator, getOne } = require("../controllers/notesController");

// we simply define paths in this file.
// do you understand what's going on with 'validator'?
// try submitting a note w/o an author or content
router.route("/").get(get).post(validator, post);
// use postman or thunderclient or even address bar to get 
// http://localhost:8080/notes/5ed2b37f-8fbd-4cf4-b64a-cbaa0cc28b5c
router.route("/:id").get(getOne);

module.exports = router;
