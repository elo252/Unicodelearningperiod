const express = require('express')
const router = new express.Router()
 const {
  createUser,
  updateUser,
  enrollCourse,
  getUsers,
  deleteUser,
  getStudents,
  getTeachers

} = require('../controllers/user')

//Create New User 
router.post('/new', createUser)

//Get Users
router.get('/get', getUsers)

//Get Students
router.get('/getstudents', getStudents)

//Get Students
router.get('/getteachers', getTeachers)

//Update User
router.patch('/update/:id', updateUser)

//Enroll New Student
router.patch('/enroll/:id', enrollCourse)

//Delete User
router.delete('/delete/:id', deleteUser)




module.exports = router