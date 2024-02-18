var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", async function(req, res, next) {
  try {
    const results = await db("SELECT * FROM students;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/f/:criteria", async function(req, res, next) {
  try {
    const [sex, course] = req.params.criteria.split(",");

    let partialQ;

    if (sex === "all") partialQ = `course = '${course}'`;
    else if (course === "all") partialQ = `sex = '${sex}'`;
    else partialQ = `course = '${course}' AND sex = '${sex}'`;

    const result = await db(`SELECT * FROM students WHERE ${partialQ};`);

    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const result = await db(`SELECT * FROM students WHERE id = ${id};`);

    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

// INSERT a new student into the DB
router.post("/", async function(req, res, next) {
  try {
    const student = req.body;
    const {
      firstName,
      lastName,
      dob,
      course,
      sex,
      photo,
      scholarship
    } = student;
    await db(`INSERT INTO students(firstName, lastName, dob, course, sex, photo, scholarship)
    VALUES('${firstName}','${lastName}',${dob},'${course}','${sex}','${photo}', '${scholarship}');`);

    const results = await db("SELECT * FROM students;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a student from the DB
router.delete("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    await db(`DELETE FROM students WHERE id = ${id};`);

    const results = await db("SELECT * FROM students;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
