const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createUser,
  loginUser,
  updateUser,
  enrollCourse,
  getUsers,
  deleteUser,
  getStudents,
  getTeachers,
  logoutUser,
  addPfp,
  viewPfp

} = require('../controllers/user')

//Create New User 
router.post('/new', createUser)

//Upload profile picture
router.post('/profilePicture', auth, upload.single('profilePicture'), addPfp)

//View profile picture
router.get('/viewpfp/:id', auth, viewPfp)

//Login User - Public
router.post('/login', loginUser )

//Logout User
router.post('/logout', auth, logoutUser)

//Get Users
router.get('/get',auth, getUsers,)

//Get Students
router.get('/getstudents', auth,getStudents)

//Get Students
router.get('/getteachers', auth,getTeachers)

//Update User
router.patch('/update/:id',auth, updateUser)

//Enroll New Student
router.patch('/enroll/:id',auth, enrollCourse)

//Delete User
router.delete('/delete/:id',auth, deleteUser)




module.exports = router