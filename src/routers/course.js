const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const {
  createCourse,
  course_videoUpload,
  course_fileUpload,
  updateCourse,
  getCourse,
  getCoursebByOwner,
  getCourseByName,
  deleteCourse
} = require('../controllers/course')

//Create New Course 
router.post('/new', auth, createCourse)

//Upload videos in course
router.post('/uploadvideo', auth, upload.single('video'), course_videoUpload)

//Upload files in course
router.post('/uploadfile', auth, upload.single('file'), course_fileUpload)

//Get Courses
router.get('/get', auth, getCourse)

//Get Courses by specific
router.get('/get/:owner', auth, getCoursebByOwner)

//Get courses by Name
router.get('/getbyname/:name',auth, getCourseByName)

//Update course
router.patch('/update/:id',auth, updateCourse)

//Delete Course
router.delete('/delete/:id', auth, deleteCourse)

module.exports = router