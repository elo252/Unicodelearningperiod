const express = require('express')
const router = new express.Router()
const {
  createCourse,
  updateCourse,
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

//Delete Course
router.delete('/delete/:id', deleteCourse)

module.exports = router