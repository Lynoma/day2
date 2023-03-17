const express = require('express');
const studentController = require('../controllers/student.controller');

const studentRouter = express.Router();

studentRouter.get('/', studentController.getStudents);
studentRouter.get('/:id', studentController.getStudent);
studentRouter.post('/', studentController.postStudent);
studentRouter.put('/:id', studentController.putStudent);
studentRouter.delete('/:id', studentController.deleteStudent);

module.exports = studentRouter;