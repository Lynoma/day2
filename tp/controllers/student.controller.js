const { students } = require("../models/data");

function getStudents(req, res) {
  res.send(students);
}
function getStudent(req, res) {
  const tmpid = req.params.id;
  const student = students.filter(({ id }) => id === tmpid);
  if (student) {
    res.send(student[0]);
  } else {
    res.status(400).send(`No Student with id ${id}`);
  }
}

function postStudent(req, res) {
  if (!req.body.name) {
    return res.status(400).send("Missing student's name");
  }
  const newStudent = {
    id: students[students.length - 1].id + 1,
    name: req.body.name,
    courses: req.body.courses,
  };
  students.push(newStudent);
  res.send(newStudent);
}

function putStudent(req, res) {
  if (!req.body.name) {
    return res.status(400).send("Missing student's name");
  }
  const tmpid = req.params.id;
  const student = students.filter(({ id }) => id === tmpid);
  if (student) {
    const idx = students.findIndex((obj) => obj.id == tmpid);
    const newStudent = {
      id: students[students.length - 1].id + 1,
      name: req.body.name,
      courses: req.body.courses,
    };
    students[idx] = newStudent;
    res.send(newStudent);
  } else {
    res.status(400).send(`No student with id ${id}`);
  }
}
function deleteStudent(req, res) {
  const tmpid = req.params.id;
  const student = students.filter(({ id }) => id === +tmpid);
  if (student) {
    const idx = students.findIndex((obj) => obj.id == tmpid);
    students.splice(idx, 1);
    res.send(`Student with id ${tmpid} is deleted`);
  } else {
    res.send(`Student with id ${tmpid} doesn't exist`);
  }
}
module.exports = {
  getStudents,
  getStudent,
  postStudent,
  putStudent,
  deleteStudent,
};
