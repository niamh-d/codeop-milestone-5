var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function(req, res, next) {
  try {
    const results = await db("SELECT * FROM courses;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tutor/:course", async function(req, res, next) {
  const results = await db(
    `SELECT tutorId FROM courses WHERE title = '${req.params.course}';`
  );

  const tutor = await db(
    `SELECT * FROM tutors WHERE id = ${results.data[0].tutorId};`
  );
  res.send(tutor.data[0]);
});

router.get("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const result = await db(`SELECT * FROM courses WHERE id = ${id};`);

    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
