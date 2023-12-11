const express = require("express");
const router = express.Router();

router.get("/facts", (req, res) => {
  const fact = { data: [{ attributes: { body: "local dog fact!" } }] };
  res.json(fact);
});

module.exports = router;
