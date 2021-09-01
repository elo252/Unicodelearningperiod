const express = require('express')
const router = new express.Router()
 const {
  createStudent,
  enrollCourse,
  getUsers,
  deleteStudent,
  createTeacher,
  deleteTeacher

} = require('../controllers/user')

//Create New Student 
router.post('/student/new', createStudent)

//Get Users
router.get('/users/get', getUsers)

//Enroll New Student
router.patch('/student/enroll/:id', enrollCourse)

//Delete Student
router.delete('/student/delete/:id', deleteStudent)

//Create New Teacher 
router.post('teacher/new', createTeacher)

//Delete Teacher
router.delete('teacher/delete', deleteTeacher)


module.exports = router