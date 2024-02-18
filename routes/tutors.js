var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", function(req, res, next) {
  db("SELECT * FROM tutors;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one course
router.get("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const result = await db(`SELECT * FROM tutors WHERE id = ${id};`);

    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
