const express = require('express')
const router = new express.Router()
const {
  createCourse,
  getCourse,
  getCoursebByOwner,
  getCourseByName,
  deleteCourse
} = require('../controllers/course')

//Create New Course 
router.post('/new', createCourse)

//Get Courses
router.get('/get', getCourse)

//Get Courses by specific
router.get('/get/:owner', getCoursebByOwner)

//Get courses by Name
router.get('/getbyname/:name', getCourseByName)

//Get Course by enrollment

//Delete Course
router.delete('/delete', deleteCourse)

module.exports = router